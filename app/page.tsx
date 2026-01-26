import dynamic from 'next/dynamic'
import { HeroSection } from './components/home/hero-section'

// Lazy load below-the-fold sections to improve initial page load
// These components will only be loaded when they're about to enter the viewport
const ProblemSolutionSection = dynamic(
  () => import('./components/home/problem-solution-section').then(mod => ({ default: mod.ProblemSolutionSection })),
  { ssr: true } // Still server-render for SEO, but defer client-side JS
)

const FeaturesSection = dynamic(
  () => import('./components/home/features-section').then(mod => ({ default: mod.FeaturesSection })),
  { ssr: true }
)

const HowItWorksSection = dynamic(
  () => import('./components/home/how-it-works-section').then(mod => ({ default: mod.HowItWorksSection })),
  { ssr: true }
)

const CTASection = dynamic(
  () => import('./components/home/cta-section').then(mod => ({ default: mod.CTASection })),
  { ssr: true }
)

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
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
