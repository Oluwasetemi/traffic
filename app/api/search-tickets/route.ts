import { NextRequest, NextResponse } from 'next/server'
import type { TicketSearchRequest, TrafficTicket } from '@/app/types'

export async function POST(request: NextRequest) {
  try {
    const body: TicketSearchRequest = await request.json()

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || '127.0.0.1'

    // Convert dates to Unix timestamps (milliseconds)
    const dateOfBirthTimestamp = new Date(body.dateOfBirth).getTime()
    const origLicIssueDateTimestamp = body.origLicIssueDate
      ? new Date(body.origLicIssueDate).getTime()
      : dateOfBirthTimestamp // fallback if not provided

    // Query params for pagination and sorting
    const queryParams = new URLSearchParams({
      size: '20',
      sort: 'id,desc',
    })

    // Request body with license data and timestamps
    const requestBody = {
      driversLicNo: body.driversLicNo,
      controlNo: body.controlNo,
      origLicIssueDate: origLicIssueDateTimestamp,
      dateOfBirth: dateOfBirthTimestamp,
      ipAddress: ip,
    }

    const response = await fetch(
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

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: 'Failed to search tickets', details: error },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform the response to match our expected format
    let rawTickets = [] as TrafficTicket[]

    if (Array.isArray(data)) {
      rawTickets = data
    } else if (data.content && Array.isArray(data.content)) {
      // JHipster pagination format
      rawTickets = data.content
    } else if (data.tickets && Array.isArray(data.tickets)) {
      rawTickets = data.tickets
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
      officerName: 'Officer', // Officer name not provided in API
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

    return NextResponse.json(transformedData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
