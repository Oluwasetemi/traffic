'use client'

import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarFooter,
} from './sidebar'
import { HomeIcon, MagnifyingGlassIcon, ChartBarIcon, DocumentTextIcon, CreditCardIcon } from '@heroicons/react/20/solid'
import { ThemeToggle } from './theme-toggle'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">JM</span>
          </div>
          <span className="font-semibold text-zinc-950 dark:text-white">
            Traffic Tickets
          </span>
        </div>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/" current={pathname === '/'}>
            <HomeIcon />
            <SidebarLabel>Home</SidebarLabel>
          </SidebarItem>
          {pathname !== '/' && (
            <>
              <SidebarItem href="/lookup" current={pathname === '/lookup'}>
                <MagnifyingGlassIcon />
                <SidebarLabel>Lookup</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
                <ChartBarIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
            </>
          )}
          <SidebarItem href="/offences" current={pathname === '/offences'}>
            <DocumentTextIcon />
            <SidebarLabel>Offences</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/payment" current={pathname === '/payment'}>
            <CreditCardIcon />
            <SidebarLabel>Payment</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
      </SidebarBody>

      <SidebarFooter>
        <div className="flex items-center justify-between px-2">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
