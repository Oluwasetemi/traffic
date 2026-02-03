'use client'

import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  BellAlertIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { useScrollTrigger } from '../../hooks/useScrollTrigger'

const coreFeatures = [
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

const newFeatures = [
  {
    name: 'Install as Mobile App',
    description: 'One-tap installation to your home screen. Access your dashboard offline, get native app performance, and enjoy a seamless mobile experience.',
    icon: DevicePhoneMobileIcon,
    accent: 'from-[#009B3A] to-emerald-600',
    highlight: 'NEW',
  },
  {
    name: 'Push Notifications',
    description: 'Stay informed with real-time alerts about ticket updates, payment reminders, and important deadline notifications.',
    icon: BellAlertIcon,
    accent: 'from-[#FFC72C] to-amber-500',
    highlight: 'NEW',
  },
  {
    name: 'Share Your Dashboard',
    description: 'Generate beautiful, shareable reports of your traffic ticket dashboard. Download as Image or share directly to social platforms.',
    icon: ShareIcon,
    accent: 'from-blue-500 to-cyan-500',
    highlight: 'NEW',
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const newFeaturesRef = useRef<HTMLDivElement>(null)
  const isVisible = useScrollTrigger(sectionRef)
  const isNewVisible = useScrollTrigger(newFeaturesRef, { threshold: 0.2 })

  return (
    <>
      {/* Core Features Section */}
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
            {coreFeatures.map((feature, index) => (
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

      {/* New PWA Features - Elevated Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-24 sm:py-32" ref={newFeaturesRef}>
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#009B3A]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFC72C]/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#009B3A]/10 to-[#FFC72C]/10 border border-[#009B3A]/20 dark:border-[#FFC72C]/20 mb-6 transition-all duration-700 ${isNewVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009B3A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009B3A]"></span>
              </span>
              <span className="text-sm font-semibold text-zinc-950 dark:text-white">Progressive Web App Features</span>
            </div>
            <h2 className={`text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl font-display transition-all duration-700 delay-100 ${isNewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Experience the future of{' '}
              <span className="text-gradient">ticket management</span>
            </h2>
            <p className={`mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 transition-all duration-700 delay-200 ${isNewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Install our PWA for offline access, real-time notifications, and seamless sharing
            </p>
          </div>

          {/* Asymmetric Feature Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {newFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`group relative transition-all duration-700`}
                style={{
                  transitionDelay: isNewVisible ? `${(index + 3) * 150}ms` : '0ms',
                  opacity: isNewVisible ? 1 : 0,
                  transform: isNewVisible ? 'translateY(0) rotateX(0deg)' : 'translateY(40px) rotateX(-10deg)',
                }}
              >
                {/* Gradient Border Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#009B3A] via-[#FFC72C] to-[#009B3A] rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-xl" />

                {/* Main Card */}
                <div className="relative h-full p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 dark:shadow-black/20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#009B3A]/20 dark:group-hover:shadow-[#FFC72C]/20 group-hover:-translate-y-2">
                  {/* NEW Badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${feature.accent} text-white text-xs font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500`}>
                      {feature.highlight}
                    </div>
                  </div>

                  {/* Icon Container with Animated Background */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className={`relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <feature.icon className="size-8 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-gradient transition-all duration-300">
                    {feature.name}
                  </h3>
                  <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>

                  {/* Decorative Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div className={`w-full h-full bg-gradient-to-tl ${feature.accent} rounded-tl-[3rem]`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isNewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              All features work seamlessly across desktop and mobile
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#009B3A] to-[#FFC72C] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <DevicePhoneMobileIcon className="size-5" />
              <span>Try it now</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
