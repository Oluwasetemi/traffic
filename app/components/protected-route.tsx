'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import { useSession } from '../lib/auth-client'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useTransitionRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isPending && !session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [session, isPending, router, pathname])

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
        <div className="text-center">
          <div className="inline-block size-12 animate-spin motion-reduce:animate-none rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}
