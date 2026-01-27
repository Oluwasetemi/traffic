import { NextRequest, NextResponse } from 'next/server'
import type { DriverLicenseValidationRequest, TrafficTicket } from '@/app/types'

/**
 * Combined API route that validates license AND searches for tickets in one request.
 * This eliminates the client-side waterfall pattern by handling both operations server-side.
 *
 * Follows Vercel React best practice: async-parallel
 * - Validates the license first
 * - If valid, fetches tickets in the same request
 * - Returns combined result to client
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body: DriverLicenseValidationRequest

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { isValid: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.driversLicNo || typeof body.driversLicNo !== 'string') {
      return NextResponse.json(
        { isValid: false, error: 'Missing or invalid driversLicNo field' },
        { status: 400 }
      )
    }

    if (!body.controlNo || typeof body.controlNo !== 'string') {
      return NextResponse.json(
        { isValid: false, error: 'Missing or invalid controlNo field' },
        { status: 400 }
      )
    }

    if (!body.dateOfBirth || typeof body.dateOfBirth !== 'string') {
      return NextResponse.json(
        { isValid: false, error: 'Missing or invalid dateOfBirth field' },
        { status: 400 }
      )
    }

    if (!body.origLicIssueDate || typeof body.origLicIssueDate !== 'string') {
      return NextResponse.json(
        { isValid: false, error: 'Missing or invalid origLicIssueDate field' },
        { status: 400 }
      )
    }

    // Validate date fields produce valid timestamps
    const dateOfBirthTimestamp = new Date(body.dateOfBirth).getTime()
    if (isNaN(dateOfBirthTimestamp)) {
      return NextResponse.json(
        { isValid: false, error: 'Invalid dateOfBirth format (expected YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    const origLicIssueDateTimestamp = new Date(body.origLicIssueDate).getTime()
    if (isNaN(origLicIssueDateTimestamp)) {
      return NextResponse.json(
        { isValid: false, error: 'Invalid origLicIssueDate format (expected YYYY-MM-DD)' },
        { status: 400 }
      )
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1'

    // Step 1: Validate the license
    const validationResponse = await fetch(
      'https://trafficticketlookup.gov.jm/api/driver-licences/is-valid',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://trafficticketlookup.gov.jm',
          'Referer': 'https://trafficticketlookup.gov.jm/',
        },
        body: JSON.stringify({
          ...body,
          ipAddress: ip,
        }),
      }
    )

    if (!validationResponse.ok) {
      const error = await validationResponse.json().catch(() => ({}))
      return NextResponse.json(
        { isValid: false, error: 'Failed to validate license', details: error },
        { status: validationResponse.status }
      )
    }

    // Defensively parse validation response
    let isValid = false
    try {
      const validationData = await validationResponse.json()

      // Handle boolean response
      if (typeof validationData === 'boolean') {
        isValid = validationData
      }
      // Handle object response with isValid property
      else if (validationData && typeof validationData === 'object' && 'isValid' in validationData) {
        isValid = validationData.isValid === true
      }
      // Handle any truthy value as valid (fallback)
      else if (validationData === true) {
        isValid = true
      }
    } catch {
      // Non-JSON or invalid response - treat as invalid
      return NextResponse.json({ isValid: false })
    }

    // If license is not valid, return early
    if (!isValid) {
      return NextResponse.json({ isValid: false })
    }

    // Step 2: License is valid - fetch tickets
    // Use the already validated timestamps from above
    const queryParams = new URLSearchParams({
      size: '20',
      sort: 'id,desc',
    })

    const requestBody = {
      driversLicNo: body.driversLicNo,
      controlNo: body.controlNo,
      origLicIssueDate: origLicIssueDateTimestamp,
      dateOfBirth: dateOfBirthTimestamp,
      ipAddress: ip,
    }

    const ticketsResponse = await fetch(
      `https://trafficticketlookup.gov.jm/api/traffic-tickets?${queryParams.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://trafficticketlookup.gov.jm',
          'Referer': 'https://trafficticketlookup.gov.jm/',
        },
        body: JSON.stringify(requestBody),
      }
    )

    // Even if tickets fetch fails, we still return that the license is valid
    if (!ticketsResponse.ok) {
      return NextResponse.json({
        isValid: true,
        tickets: null,
        error: 'Failed to fetch tickets',
      })
    }

    const ticketsData = await ticketsResponse.json()

    // Transform the response to match our expected format
    let rawTickets = [] as TrafficTicket[]

    if (Array.isArray(ticketsData)) {
      rawTickets = ticketsData
    } else if (ticketsData.content && Array.isArray(ticketsData.content)) {
      rawTickets = ticketsData.content
    } else if (ticketsData.tickets && Array.isArray(ticketsData.tickets)) {
      rawTickets = ticketsData.tickets
    }

    // Map Jamaica API fields to our expected format
    const tickets = rawTickets.map((ticket) => ({
      id: ticket.ticketNo || ticket.id,
      ticketNumber: ticket.ticketNo,
      violation: ticket.offenceDesc || ticket.violation,
      violationDate: ticket.issueDate || ticket.violationDate,
      location: ticket.courtLocation || ticket.location || 'N/A',
      fineAmount: parseFloat(ticket?.fineAmount as unknown as string) || 0,
      status: ticket.workflowState === 'Paid' ? 'Paid' : 'Outstanding',
      dueDate: ticket.paymentDueDate || ticket.dueDate,
      officerName: 'Officer',
      officerBadge: ticket.offenceCode || 'N/A',
      offenderName: ticket.offenderFirstName && ticket.offenderLastName
        ? `${ticket.offenderFirstName} ${ticket.offenderLastName}`
        : 'N/A',
      demeritPoints: parseInt(ticket.demeritPoints as unknown as string) || 0,
      mandatoryCourtApp: (ticket.mandatoryCourtApp === 'true' as unknown as boolean) || ticket.mandatoryCourtApp === true,
      offenceCode: ticket.offenceCode || 'N/A',
      paidDate: ticket.workflowState === 'Paid' ? ticket.courtDate : undefined,
      paymentMethod: ticket.workflowState === 'Paid' ? 'Paid' : undefined,
    }))

    // Calculate statistics
    const outstanding = tickets.filter((t) => t.status === 'Outstanding').length
    const totalOutstanding = tickets
      .filter((t) => t.status === 'Outstanding')
      .reduce((sum: number, t) => sum + t.fineAmount, 0)

    const transformedData = {
      tickets,
      totalTickets: tickets.length,
      outstanding,
      totalOutstanding,
    }

    return NextResponse.json({
      isValid: true,
      tickets: transformedData,
    })
  } catch {
    // Catch any unexpected errors (network failures, etc.)
    return NextResponse.json(
      { isValid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
