import { Button } from '../button'

export function CTASection() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
      <div className="relative mx-auto max-w-2xl rounded-3xl px-6 py-16 text-center overflow-hidden sm:p-16">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#009B3A] via-[#007A2E] to-[#FFC72C] opacity-90 dark:opacity-80"></div>
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Ready to check your tickets?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
            Enter your driver&apos;s license information to view your traffic ticket records
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button color="white" href="/lookup" className="hover-lift">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
