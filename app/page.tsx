'use client'

import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { Button } from './components/button'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <main>
        <div className="relative isolate overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
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

        {/* CTA Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl rounded-3xl bg-zinc-950 dark:bg-zinc-900 px-6 py-16 text-center ring-1 ring-inset ring-zinc-900/5 dark:ring-white/5 sm:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to check your tickets?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-300">
              Enter your driver's license information to view your traffic ticket records
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
