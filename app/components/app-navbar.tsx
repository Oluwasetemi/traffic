'use client'

import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
  NavbarItem
} from './navbar'
import { ThemeToggle } from './theme-toggle'
import { useSession, signOut } from '../lib/auth-client'
import { useTransitionRouter } from 'next-view-transitions'

export function AppNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const router = useTransitionRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <Navbar>
      <NavbarSection className="max-lg:hidden">
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
      <NavbarSection className="max-lg:hidden">
        {pathname !== '/' && (
          <>
            <NavbarItem href="/lookup">Lookup</NavbarItem>
            <NavbarItem href="/dashboard" current={pathname === '/dashboard'}>Dashboard</NavbarItem>
          </>
        )}
        <NavbarItem href="/offences" current={pathname === '/offences'}>Offences</NavbarItem>
        <NavbarItem href="/payment" current={pathname === '/payment'}>Payment</NavbarItem>
      </NavbarSection>
      <NavbarSection>
        <ThemeToggle />
        {session && (
          <NavbarItem onClick={handleSignOut}>
            Sign Out
          </NavbarItem>
        )}
      </NavbarSection>
    </Navbar>
  )
}
