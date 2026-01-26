import { CheckIcon } from '@heroicons/react/20/solid'

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

export function ProblemSolutionSection() {
  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <div className="col-span-2">
            <h2 className="text-base/7 font-semibold text-[#009B3A] dark:text-[#00C853]">A Better Way</h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-zinc-950 sm:text-5xl dark:text-white font-display">
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
                    className="absolute top-1 left-0 size-5 text-[#009B3A] dark:text-[#00C853]"
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
  )
}
