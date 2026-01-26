import Image from 'next/image'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export function HowItWorksSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-[#009B3A] dark:text-[#00C853]">Simple Process</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl dark:text-white font-display">
          How to lookup your tickets
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Scan License - Left Column */}
          <div className="relative max-lg:row-start-1 lg:row-span-2">
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
                    <div className="rounded-lg overflow-hidden border-2 border-blue-500 relative h-48">
                      <Image
                        alt="Front of Jamaica driver's license showing license number, issue date, and date of birth"
                        src="/id-front.png"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden border-2 border-green-500 relative h-48">
                      <Image
                        alt="Back of Jamaica driver's license showing control number and original date of issue"
                        src="/id-back.png"
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl dark:outline-white/15" />
          </div>

          {/* Auto-Fill Form - Top Right */}
          <div className="relative max-lg:row-start-2">
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
          <div className="relative max-lg:row-start-4 lg:row-span-2">
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
  )
}
