'use client'

import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Button } from './components/button'
import { useTransitionRouter } from 'next-view-transitions'

const solutions = [
  {
    name: 'Simple Date Entry',
    description: 'No more confusing date formats - our intuitive date picker handles validation automatically',
  },
  {
    name: 'Unified Dashboard',
    description: 'View all your tickets, fines, and demerit points in one organized dashboard',
  },
  {
    name: 'Comprehensive Offence Guide',
    description: 'Browse detailed information about traffic violations, fines, and demerit points',
  },
  {
    name: 'Payment Information',
    description: 'Access complete payment options including online, mobile app, and in-person methods',
  },
  {
    name: 'Smart Validation',
    description: 'Automatic form validation with helpful error messages to guide you',
  },
  {
    name: 'Accessible Design',
    description: 'Built with accessibility in mind - easy to use on any device',
  },
  {
    name: 'Demerit Point Tracking',
    description: 'Monitor your demerit points and get warnings about potential license suspension',
  },
  {
    name: 'Dark Mode Support',
    description: 'Comfortable viewing experience in any lighting condition',
  },
]

const features = [
  {
    name: 'License Validation',
    description: 'Verify driver\'s license information against the official Jamaica database',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Ticket Lookup',
    description: 'Search and view all outstanding and paid traffic tickets',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Interactive Dashboard',
    description: 'Visualize ticket statistics with charts and detailed analytics',
    icon: ChartBarIcon,
  },
  {
    name: 'Detailed Records',
    description: 'Access complete ticket information including violations, fines, and dates',
    icon: DocumentTextIcon,
  },
]

export default function Home() {
  const router = useTransitionRouter()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <main>
        <div className="relative isolate overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125rem -translate-x-1/2 rotate-30deg bg-linear-to-tr from-blue-600 to-cyan-400 opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-72.1875rem"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
                Jamaica Traffic Ticket Dashboard
              </h1>
              <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Look up and manage traffic tickets in Jamaica. Built with the official Jamaica Traffic Ticket Lookup API for secure and reliable access to your traffic violation records.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button color="blue" onClick={() => router.push('/lookup')}>
                  <MagnifyingGlassIcon data-slot="icon" />
                  Start Lookup
                </Button>
                <Button outline onClick={() => router.push('/dashboard')}>
                  View Demo Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-400 to-blue-600 opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        {/* Problem-Solution Section */}
        <div className="bg-white py-24 sm:py-32 dark:bg-zinc-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <div className="col-span-2">
                <h2 className="text-base/7 font-semibold text-blue-600 dark:text-blue-400">A Better Way</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-zinc-950 sm:text-5xl dark:text-white">
                  Solving the Pain Points
                </p>
                <p className="mt-6 text-base/7 text-zinc-700 dark:text-zinc-300">
                  The government traffic lookup website is difficult to navigate with confusing date formats,
                  no centralized dashboard, and limited information about offences and payment options.
                  I built a better solution.
                </p>
              </div>
              <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-zinc-600 sm:grid-cols-2 lg:gap-y-16 dark:text-zinc-400">
                {solutions.map((solution) => (
                  <div key={solution.name} className="relative pl-9">
                    <dt className="font-semibold text-zinc-950 dark:text-white">
                      <CheckIcon
                        aria-hidden="true"
                        className="absolute top-1 left-0 size-5 text-blue-600 dark:text-blue-400"
                      />
                      {solution.name}
                    </dt>
                    <dd className="mt-2">{solution.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              Everything you need to manage tickets
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Access comprehensive traffic ticket information with our modern, user-friendly dashboard
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-zinc-950 dark:text-white">
                    <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="size-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-center text-base/7 font-semibold text-blue-600 dark:text-blue-400">Simple Process</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white">
              How to lookup your tickets
            </p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              {/* Scan License - Left Column */}
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl dark:bg-gray-800" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                      1. Scan Your License
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                      Use your camera or upload photos of both sides of your Jamaica driver&apos;s license. Our AI will automatically extract the required information.
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div className="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-lg bg-gray-100 shadow-xl dark:bg-gray-950">
                      <div className="flex flex-col gap-4 p-4">
                        <div className="rounded-lg overflow-hidden border-2 border-blue-500">
                          <img
                            alt="Front of Jamaica driver's license showing license number, issue date, and date of birth"
                            src="/id-front.png"
                            className="w-full object-cover"
                          />
                        </div>
                        <div className="rounded-lg overflow-hidden border-2 border-green-500">
                          <img
                            alt="Back of Jamaica driver's license showing control number and original date of issue"
                            src="/id-back.png"
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/15" />
              </div>

              {/* Auto-Fill Form - Top Right */}
              <div className="relative max-lg:row-start-1">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl dark:bg-gray-800" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                      2. Auto-Fill Form
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                      The extracted information automatically fills in the lookup form. Review and make any corrections if needed.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 pt-6 pb-8">
                    <div className="w-full max-w-sm space-y-3 text-xs">
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 mb-1">License Number (TRN)</div>
                        <div className="rounded border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2 font-mono text-gray-900 dark:text-white">
                          123456789 ✓
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 mb-1">Control Number</div>
                        <div className="rounded border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2 font-mono text-gray-900 dark:text-white">
                          0123456789 ✓
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 mb-1">Date of Birth</div>
                        <div className="rounded border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2 font-mono text-gray-900 dark:text-white">
                          1993-01-15 ✓
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600 dark:text-gray-400 mb-1">Original Issue Date</div>
                        <div className="rounded border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2 font-mono text-gray-900 dark:text-white">
                          2022-11-17 ✓
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl dark:outline-white/15" />
              </div>

              {/* Verify & Submit - Middle Right */}
              <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                      3. Verify & Submit
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                      Double-check the extracted information and submit to validate against the official database.
                    </p>
                  </div>
                  <div className="flex flex-1 items-center justify-center px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-full bg-blue-600">
                        <ShieldCheckIcon className="size-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Official API</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Secure validation</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 dark:outline-white/15" />
              </div>

              {/* View Dashboard - Right Column */}
              <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl dark:bg-gray-800" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                  <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center dark:text-white">
                      4. View Your Dashboard
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center dark:text-gray-400">
                      Access your personalized dashboard with all tickets, fines, demerit points, and payment information in one place.
                    </p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div className="absolute inset-x-8 top-8 bottom-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-950 shadow-xl">
                      <div className="h-full overflow-auto p-3">
                        {/* Stats Grid - Matching Dashboard Design */}
                        <div className="mb-3 grid grid-cols-3 gap-px bg-gray-900/5 dark:bg-white/10">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-4 dark:bg-zinc-900">
                            <dt className="text-[0.6rem] font-medium text-gray-500 dark:text-gray-400">Total Tickets</dt>
                            <dd className="text-[0.5rem] font-medium text-gray-700 dark:text-gray-300">5 total</dd>
                            <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900 dark:text-white">5</dd>
                          </div>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-4 dark:bg-zinc-900">
                            <dt className="text-[0.6rem] font-medium text-gray-500 dark:text-gray-400">Outstanding</dt>
                            <dd className="text-[0.5rem] font-medium text-rose-600 dark:text-rose-400">3 unpaid</dd>
                            <dd className="w-full flex-none text-lg font-medium tracking-tight text-gray-900 dark:text-white">3</dd>
                          </div>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-4 dark:bg-zinc-900">
                            <dt className="text-[0.6rem] font-medium text-gray-500 dark:text-gray-400">Total Owed</dt>
                            <dd className="text-[0.5rem] font-medium text-rose-600 dark:text-rose-400">3 tickets</dd>
                            <dd className="w-full flex-none text-sm font-medium tracking-tight text-gray-900 dark:text-white">$15K</dd>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="mb-2 flex gap-1">
                          <button className="rounded bg-blue-600 px-2 py-1 text-[0.55rem] font-medium text-white">
                            All Tickets
                          </button>
                          <button className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-[0.55rem] font-medium text-zinc-700 dark:text-zinc-300">
                            Outstanding
                          </button>
                          <button className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-1 text-[0.55rem] font-medium text-zinc-700 dark:text-zinc-300">
                            Paid
                          </button>
                        </div>

                        {/* Tickets Table Preview */}
                        <div className="rounded-lg bg-white dark:bg-zinc-900 p-2 text-[0.6rem]">
                          <div className="space-y-1">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 gap-2 border-b border-gray-200 dark:border-gray-700 pb-1 font-semibold text-gray-900 dark:text-white">
                              <div>Ticket</div>
                              <div>Violation</div>
                              <div>Amount</div>
                              <div>Status</div>
                            </div>
                            {/* Table Rows */}
                            <div className="grid grid-cols-4 gap-2 py-1 text-gray-600 dark:text-gray-400">
                              <div className="font-mono text-[0.55rem]">TK001</div>
                              <div>Speeding</div>
                              <div>$5,000</div>
                              <div>
                                <span className="inline-flex rounded-full bg-red-100 dark:bg-red-950 px-1.5 py-0.5 text-[0.5rem] text-red-700 dark:text-red-300">
                                  Outstanding
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 py-1 text-gray-600 dark:text-gray-400">
                              <div className="font-mono text-[0.55rem]">TK002</div>
                              <div>No Seatbelt</div>
                              <div>$3,000</div>
                              <div>
                                <span className="inline-flex rounded-full bg-green-100 dark:bg-green-950 px-1.5 py-0.5 text-[0.5rem] text-green-700 dark:text-green-300">
                                  Paid
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 py-1 text-gray-600 dark:text-gray-400">
                              <div className="font-mono text-[0.55rem]">TK003</div>
                              <div>Parking</div>
                              <div>$2,000</div>
                              <div>
                                <span className="inline-flex rounded-full bg-red-100 dark:bg-red-950 px-1.5 py-0.5 text-[0.5rem] text-red-700 dark:text-red-300">
                                  Outstanding
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ticket Details Section */}
                        <div className="mt-3 space-y-2">
                          <div className="text-[0.65rem] font-semibold text-gray-900 dark:text-white">Ticket Details</div>

                          {/* Ticket Detail Card 1 */}
                          <div className="rounded-lg bg-white dark:bg-zinc-900 p-2">
                            <div className="mb-1.5 flex items-start justify-between">
                              <div>
                                <div className="text-[0.6rem] font-semibold text-gray-900 dark:text-white">TK001</div>
                                <div className="text-[0.55rem] text-gray-600 dark:text-gray-400">Speeding</div>
                              </div>
                              <span className="inline-flex rounded-full bg-red-100 dark:bg-red-950 px-1.5 py-0.5 text-[0.5rem] text-red-700 dark:text-red-300">
                                Outstanding
                              </span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-1.5">
                              <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-[0.5rem]">
                                <dt className="text-gray-600 dark:text-gray-400">Violation Date</dt>
                                <dd className="text-gray-900 dark:text-white">Jan 15, 2024</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Location</dt>
                                <dd className="text-gray-900 dark:text-white">Kingston</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Fine Amount</dt>
                                <dd className="text-gray-900 dark:text-white">JMD $5,000</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Due Date</dt>
                                <dd className="text-gray-900 dark:text-white">Feb 15, 2024</dd>
                              </dl>
                            </div>
                          </div>

                          {/* Ticket Detail Card 2 */}
                          <div className="rounded-lg bg-white dark:bg-zinc-900 p-2">
                            <div className="mb-1.5 flex items-start justify-between">
                              <div>
                                <div className="text-[0.6rem] font-semibold text-gray-900 dark:text-white">TK002</div>
                                <div className="text-[0.55rem] text-gray-600 dark:text-gray-400">No Seatbelt</div>
                              </div>
                              <span className="inline-flex rounded-full bg-green-100 dark:bg-green-950 px-1.5 py-0.5 text-[0.5rem] text-green-700 dark:text-green-300">
                                Paid
                              </span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-1.5">
                              <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-[0.5rem]">
                                <dt className="text-gray-600 dark:text-gray-400">Violation Date</dt>
                                <dd className="text-gray-900 dark:text-white">Dec 10, 2023</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Location</dt>
                                <dd className="text-gray-900 dark:text-white">Montego Bay</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Fine Amount</dt>
                                <dd className="text-gray-900 dark:text-white">JMD $3,000</dd>
                                <dt className="text-gray-600 dark:text-gray-400">Paid Date</dt>
                                <dd className="text-gray-900 dark:text-white">Dec 20, 2023</dd>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl dark:outline-white/15" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl rounded-3xl bg-zinc-950 dark:bg-zinc-900 px-6 py-16 text-center ring-1 ring-inset ring-zinc-900/5 dark:ring-white/5 sm:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to check your tickets?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Enter your driver&apos;s license information to view your traffic ticket records
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button color="white" onClick={() => router.push('/lookup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-950/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-center text-sm leading-5 text-zinc-600 dark:text-zinc-400">
            Built with the official Jamaica Traffic Ticket Lookup API
          </p>
        </div>
      </footer>
    </div>
  )
}
