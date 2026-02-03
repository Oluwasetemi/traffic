'use client'

import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { ProtectedRoute } from '../components/protected-route'
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
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { CountUp } from '../components/count-up'
import type { TicketSearchResponse } from '../types'
import { PushNotificationManager } from '../components/pwa/push-notification-manager'
import { InstallPrompt } from '../components/pwa/install-prompt'
import { ShareButton } from '../components/dashboard/share-dashboard'

export default function DashboardPage() {
  const [data, setData] = useState<TicketSearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'outstanding' | 'paid'>('all')
  const [isRealData, setIsRealData] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)

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
    } catch (error: unknown) {
      // Silently fall back to no data - user will see empty state
    } finally {
      setIsLoading(false)
    }
  }

  // Memoize filtered tickets to prevent recalculation on every render
  const filteredTickets = useMemo(() =>
    data?.tickets?.filter((ticket) => {
      if (filter === 'all') return true
      if (filter === 'outstanding') return ticket.status.toLowerCase() === 'outstanding'
      if (filter === 'paid') return ticket.status.toLowerCase() === 'paid'
      return true
    }) || [],
    [data?.tickets, filter]
  )

  // Memoize total demerit points calculation
  const totalDemeritPoints = useMemo(() =>
    data?.tickets?.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0) || 0,
    [data?.tickets]
  )

  // Memoize currency formatter to prevent recreation on every call
  const currencyFormatter = useMemo(() =>
    new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
    }),
    []
  )

  const formatCurrency = useCallback((amount: number) => {
    const formatted = currencyFormatter.format(amount)
    // Replace $ with JMD to show currency code
    return formatted.replace('$', 'JMD $')
  }, [currencyFormatter])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-JM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
        <div className="text-center">
          <div className="inline-block size-12 animate-spin motion-reduce:animate-none rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 bg-grid-pattern -z-10" />
        <main ref={dashboardRef} className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <Heading className="font-display">Traffic Ticket Dashboard</Heading>
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
              {/* Suspension Warning - Using memoized totalDemeritPoints */}
              {(() => {
                if (totalDemeritPoints >= 10) {
                  return (
                    <div className="rounded-xl bg-red-50 dark:bg-red-950/20 p-4 border border-red-200 dark:border-red-900">
                      <div className="flex gap-3">
                        <ExclamationTriangleIcon className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-900 dark:text-red-200">
                            License Suspension Risk
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            {totalDemeritPoints >= 20
                              ? `You have ${totalDemeritPoints} demerit points. This triggers a 2-year suspension and requires competency retesting.`
                              : totalDemeritPoints >= 14
                              ? `You have ${totalDemeritPoints} demerit points. This triggers a 1-year license suspension.`
                              : `You have ${totalDemeritPoints} demerit points. This triggers a 6-month license suspension.`}
                            {' '}You must surrender your license within 21 days of notice.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                } else if (totalDemeritPoints >= 7) {
                  return (
                    <div className="rounded-xl bg-yellow-50 dark:bg-yellow-950/20 p-4 border border-yellow-200 dark:border-yellow-900">
                      <div className="flex gap-3">
                        <ExclamationTriangleIcon className="size-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                            Approaching Suspension Threshold
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                            You have {totalDemeritPoints} demerit points. At 10 points, your license will be suspended for 6 months.
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
        <dl className="rounded-2xl border dark:border-white/5 mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-5 mb-12 dark:bg-white/10">
          {/* Total Tickets */}
          <div className="hover-lift flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 dark:bg-zinc-900 rounded-t-2xl border-transparent border dark:border-white/5 sm:rounded-none sm:rounded-tl-2xl lg:rounded-none lg:rounded-l-2xl">
            <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Total Tickets</dt>
            <dd className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {data?.totalTickets || 0} total
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900 dark:text-white font-mono-custom">
              <CountUp end={data?.totalTickets || 0} duration={1.5} />
            </dd>
          </div>

          {/* Outstanding */}
          <div className="hover-lift flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 dark:bg-zinc-900 sm:rounded-none sm:rounded-tr-2xl lg:rounded-none">
            <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Outstanding</dt>
            <dd className="text-xs font-medium text-rose-600 dark:text-rose-400">
              {data?.outstanding || 0} unpaid
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900 dark:text-white font-mono-custom">
              <CountUp end={data?.outstanding || 0} duration={1.5} />
            </dd>
          </div>

          {/* Paid */}
          <div className="hover-lift flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 dark:bg-zinc-900">
            <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Paid</dt>
            <dd className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {((data?.totalTickets || 0) - (data?.outstanding || 0))} settled
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900 dark:text-white font-mono-custom">
              <CountUp end={(data?.totalTickets || 0) - (data?.outstanding || 0)} duration={1.5} />
            </dd>
          </div>

          {/* Total Owed */}
          <div className="hover-lift flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 dark:bg-zinc-900">
            <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Total Owed</dt>
            <dd className="text-xs font-medium text-rose-600 dark:text-rose-400">
              {data?.outstanding || 0} tickets
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900 dark:text-white font-mono-custom">
              <CountUp
                end={data?.totalOutstanding || 0}
                duration={1.5}
                prefix="JMD $"
                decimals={2}
              />
            </dd>
          </div>

          {/* Demerit Points */}
          <div className="hover-lift flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 dark:bg-zinc-900   border-transparent rounded-b-2xl dark:border-white/5 sm:rounded-none sm:rounded-bl-2xl lg:rounded-none lg:rounded-r-2xl">
            <dt className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Demerit Points</dt>
            <dd className={`text-xs font-medium ${
              totalDemeritPoints >= 10
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {totalDemeritPoints >= 10
                ? 'At risk'
                : 'Safe'}
            </dd>
            <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900 dark:text-white font-mono-custom">
              <CountUp end={totalDemeritPoints} duration={1.5} />
            </dd>
          </div>
        </dl>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover-lift ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#009B3A] to-[#FFC72C] text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              All Tickets
            </button>
            <button
              type="button"
              onClick={() => setFilter('outstanding')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover-lift ${
                filter === 'outstanding'
                  ? 'bg-gradient-to-r from-[#009B3A] to-[#FFC72C] text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              Outstanding
            </button>
            <button
              type="button"
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover-lift ${
                filter === 'paid'
                  ? 'bg-gradient-to-r from-[#009B3A] to-[#FFC72C] text-white'
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

        {/* PWA Components */}
        <div className="mt-12">
          <PushNotificationManager />
        </div>
      </main>

      {/* Install Prompt & Share Button */}
      <InstallPrompt />
      <ShareButton dashboardRef={dashboardRef} data={data} />
      </div>
    </ProtectedRoute>
  )
}
