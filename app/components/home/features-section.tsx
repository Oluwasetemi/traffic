'use client'

import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

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

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollTrigger(sectionRef)

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className={`text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl font-display transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Everything you need to manage tickets
        </h2>
        <p className={`mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Access comprehensive traffic ticket information with our modern, user-friendly dashboard
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`relative pl-16 transition-all duration-700`}
              style={{
                transitionDelay: isVisible ? `${(index + 2) * 100}ms` : '0ms',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <dt className="text-base font-semibold leading-7 text-zinc-950 dark:text-white">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#009B3A] to-[#FFC72C]">
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
  )
}
