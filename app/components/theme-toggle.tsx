'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from './theme-provider'
import { Button } from './button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button plain onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <MoonIcon data-slot="icon" />
      ) : (
        <SunIcon data-slot="icon" />
      )}
    </Button>
  )
}
