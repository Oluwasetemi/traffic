import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button } from '../button'

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-36.125rem -translate-x-1/2 rotate-30deg bg-gradient-to-tr from-[#009B3A] to-[#FFC72C] opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-72.1875rem animate-gradient-shift"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-6xl font-display">
            Jamaica{' '}
            <span className="text-gradient">
              Traffic Ticket
            </span>{' '}
            Dashboard
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Look up and manage traffic tickets in Jamaica. Built with the official Jamaica Traffic Ticket Lookup API for secure and reliable access to your traffic violation records.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button color="blue" href="/lookup" className="hover-lift">
              <MagnifyingGlassIcon data-slot="icon" />
              Start Lookup
            </Button>
            <Button outline href="/dashboard" className="hover-lift">
              View Demo Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#FFC72C] to-[#009B3A] opacity-20 dark:opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-pulse-slow"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
