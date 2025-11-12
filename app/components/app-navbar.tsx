'use client'

import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
  NavbarItem
} from './navbar'
import { ThemeToggle } from './theme-toggle'

export function AppNavbar() {
  const pathname = usePathname()

  return (
    <header className="border-b border-zinc-950/10 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Navbar>
          <NavbarSection>
            <NavbarItem href="/">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-lg font-bold text-white">JM</span>
                </div>
                <span className="font-semibold text-zinc-950 dark:text-white">
                  Traffic Tickets
                </span>
              </div>
            </NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            {pathname !== '/' && (
              <>
                <NavbarItem href="/lookup">Lookup</NavbarItem>
                <NavbarItem href="/dashboard" current={pathname === '/dashboard'}>Dashboard</NavbarItem>
              </>
            )}
            <NavbarItem href="/offences" current={pathname === '/offences'}>Offences</NavbarItem>
            <NavbarItem href="/payment" current={pathname === '/payment'}>Payment</NavbarItem>
            <ThemeToggle />
          </NavbarSection>
        </Navbar>
      </div>
    </header>
  )
}
