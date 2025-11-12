import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon, DocumentTextIcon, CreditCardIcon } from '@heroicons/react/24/solid'

const links = [
  {
    name: 'License Validation',
    href: '/lookup',
    description: 'Validate your license and look up your traffic tickets.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Traffic Offences & Fines',
    href: '/offences',
    description: 'Complete reference of Jamaica traffic violations and demerit points.',
    icon: DocumentTextIcon,
  },
  {
    name: 'How to Pay',
    href: '/payment',
    description: 'Learn about multiple convenient payment options for traffic tickets.',
    icon: CreditCardIcon,
  },
]

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-zinc-900">
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
        <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <p className="text-base/8 font-semibold text-zinc-600 dark:text-zinc-400">
            404
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul
            role="list"
            className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5 dark:divide-white/10 dark:border-white/10"
          >
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex size-10 flex-none items-center justify-center rounded-lg shadow-xs outline-1 outline-gray-900/10 dark:bg-zinc-800/50 dark:-outline-offset-1 dark:outline-white/10">
                  <link.icon
                    aria-hidden="true"
                    className="size-6 text-zinc-600 dark:text-zinc-400"
                  />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    <Link href={link.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {link.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-5 text-gray-400 dark:text-gray-500"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="text-sm/6 font-semibold text-zinc-600 dark:text-zinc-400"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
