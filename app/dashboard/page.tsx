'use client'

import { useEffect, useState } from 'react'
import { Badge } from '../components/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/table'
import {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
} from '../components/description-list'
import { Heading } from '../components/heading'
import { Divider } from '../components/divider'
import { Text } from '../components/text'
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import type { TicketSearchResponse } from '../types'

export default function DashboardPage() {
  const [data, setData] = useState<TicketSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'outstanding' | 'paid'>('all')
  const [isRealData, setIsRealData] = useState(false)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setIsLoading(true)
    try {
      // First, check if we have ticket data from the lookup flow
      const storedTicketData = sessionStorage.getItem('ticketData')

      if (storedTicketData) {
        // Use the real ticket data from API
        const ticketData = JSON.parse(storedTicketData)

        // Ensure the data has the expected structure
        if (!ticketData.tickets) {
          // Transform if needed
          const transformed = {
            tickets: Array.isArray(ticketData) ? ticketData : [],
            totalTickets: Array.isArray(ticketData) ? ticketData.length : 0,
            outstanding: 0,
            totalOutstanding: 0,
          }
          setData(transformed)
        } else {
          setData(ticketData)
        }
        setIsRealData(true)
      } else {
        // Fall back to demo data
        const response = await fetch('/api/demo/search-tickets')
        const ticketData = await response.json()
        setData(ticketData)
        setIsRealData(false)
      }
    } catch (error) {
      // Silently fall back to no data - user will see empty state
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTickets = data?.tickets?.filter((ticket) => {
    if (filter === 'all') return true
    if (filter === 'outstanding') return ticket.status.toLowerCase() === 'outstanding'
    if (filter === 'paid') return ticket.status.toLowerCase() === 'paid'
    return true
  }) || []

  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
    }).format(amount)
    // Replace $ with JMD to show currency code
    return formatted.replace('$', 'JMD $')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-JM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <Heading>Traffic Ticket Dashboard</Heading>
            <Badge color={isRealData ? 'green' : 'amber'}>
              {isRealData ? 'Live Data' : 'Demo Mode'}
            </Badge>
          </div>
          <Text className="mt-2">
            {isRealData
              ? 'Displaying your traffic violations and fines'
              : 'Showing demo data - use the Lookup page to view your actual tickets'}
          </Text>
          {data && data.tickets && data.tickets.length > 0 && (
            <div className="mt-6">
              {/* Suspension Warning */}
              {(() => {
                const totalPoints = data.tickets.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0)
                if (totalPoints >= 10) {
                  return (
                    <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-4 border border-red-200 dark:border-red-900">
                      <div className="flex gap-3">
                        <ExclamationTriangleIcon className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-900 dark:text-red-200">
                            License Suspension Risk
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            {totalPoints >= 20
                              ? `You have ${totalPoints} demerit points. This triggers a 2-year suspension and requires competency retesting.`
                              : totalPoints >= 14
                              ? `You have ${totalPoints} demerit points. This triggers a 1-year license suspension.`
                              : `You have ${totalPoints} demerit points. This triggers a 6-month license suspension.`}
                            {' '}You must surrender your license within 21 days of notice.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                } else if (totalPoints >= 7) {
                  return (
                    <div className="rounded-xl bg-yellow-50 dark:bg-yellow-950/20 p-4 border border-yellow-200 dark:border-yellow-900">
                      <div className="flex gap-3">
                        <ExclamationTriangleIcon className="size-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                            Approaching Suspension Threshold
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            You have {totalPoints} demerit points. At 10 points, your license will be suspended for 6 months.
                            Points expire after 15 months if you stay below 10.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              })()}
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-12">
          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <DocumentTextIcon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Tickets</p>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">{data?.totalTickets || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950">
                <ExclamationCircleIcon className="size-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Outstanding</p>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">{data?.outstanding || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950">
                <CheckCircleIcon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Paid</p>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                  {(data?.totalTickets || 0) - (data?.outstanding || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950">
                <CurrencyDollarIcon className="size-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Owed</p>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                  {formatCurrency(data?.totalOutstanding || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-950">
                <ExclamationTriangleIcon className="size-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Demerit Points</p>
                <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                  {data?.tickets?.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              All Tickets
            </button>
            <button
              onClick={() => setFilter('outstanding')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'outstanding'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Outstanding
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === 'paid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 ring-1 ring-zinc-950/5 dark:ring-white/10 overflow-hidden p-6">
          <Table bleed>
            <TableHead>
              <TableRow>
                <TableHeader>Ticket Number</TableHeader>
                <TableHeader>Violation</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <p className="text-zinc-600 dark:text-zinc-400">No tickets found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                    <TableCell>{ticket.violation}</TableCell>
                    <TableCell>{formatDate(ticket.violationDate)}</TableCell>
                    <TableCell>{ticket.location}</TableCell>
                    <TableCell>{formatCurrency(ticket.fineAmount)}</TableCell>
                    <TableCell>
                      <Badge color={ticket.status === 'Outstanding' ? 'red' : 'green'}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Ticket Details Section */}
        {filteredTickets.length > 0 && (
          <div className="mt-12">
            <Heading level={2}>Ticket Details</Heading>
            <div className="mt-6 space-y-6">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                        {ticket.ticketNumber}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{ticket.violation}</p>
                    </div>
                    <Badge color={ticket.status === 'Outstanding' ? 'red' : 'green'}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <Divider className="my-4" />
                  <DescriptionList>
                    <DescriptionTerm>Violation Date</DescriptionTerm>
                    <DescriptionDetails>{formatDate(ticket.violationDate)}</DescriptionDetails>

                    <DescriptionTerm>Location</DescriptionTerm>
                    <DescriptionDetails>{ticket.location}</DescriptionDetails>

                    <DescriptionTerm>Fine Amount</DescriptionTerm>
                    <DescriptionDetails>{formatCurrency(ticket.fineAmount)}</DescriptionDetails>

                    <DescriptionTerm>Due Date</DescriptionTerm>
                    <DescriptionDetails>{formatDate(ticket.dueDate)}</DescriptionDetails>

                    <DescriptionTerm>Offence Code</DescriptionTerm>
                    <DescriptionDetails>{ticket.offenceCode || ticket.officerBadge}</DescriptionDetails>

                    {ticket.offenderName && (
                      <>
                        <DescriptionTerm>Offender Name</DescriptionTerm>
                        <DescriptionDetails>{ticket.offenderName}</DescriptionDetails>
                      </>
                    )}

                    {ticket.demeritPoints !== undefined && ticket.demeritPoints > 0 && (
                      <>
                        <DescriptionTerm>Demerit Points</DescriptionTerm>
                        <DescriptionDetails>{ticket.demeritPoints}</DescriptionDetails>
                      </>
                    )}

                    {ticket.mandatoryCourtApp !== undefined && (
                      <>
                        <DescriptionTerm>Mandatory Court Appearance</DescriptionTerm>
                        <DescriptionDetails>
                          {ticket.mandatoryCourtApp ? 'Yes' : 'No'}
                        </DescriptionDetails>
                      </>
                    )}

                    {ticket.paidDate && (
                      <>
                        <DescriptionTerm>Paid Date</DescriptionTerm>
                        <DescriptionDetails>{formatDate(ticket.paidDate)}</DescriptionDetails>

                        <DescriptionTerm>Payment Method</DescriptionTerm>
                        <DescriptionDetails>{ticket.paymentMethod}</DescriptionDetails>
                      </>
                    )}
                  </DescriptionList>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
