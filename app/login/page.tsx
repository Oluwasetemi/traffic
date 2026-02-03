'use client'

import { useState } from 'react'
import { Link } from '../components/link'
import { Button } from '../components/button'
import { AuthLayout } from '../components/auth-layout'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { signIn } from '../lib/auth-client'

export function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
        fill="#EA4335"
      />
      <path
        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
        fill="#4285F4"
      />
      <path
        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
        fill="#FBBC05"
      />
      <path
        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
        fill="#34A853"
      />
    </svg>
  )
}


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn.social({
        provider: 'google',
        callbackURL: '/lookup',
      })

      // If redirect is false, the flow failed and no redirect will occur
      if (!result.redirect) {
        setError('Failed to sign in with Google. Please try again.')
        setIsLoading(false)
      }
      // If redirect is true, Better Auth will navigate to the provider's auth URL
    } catch {
      setError('Failed to sign in with Google. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heading level={1}>Sign in to your account</Heading>
          <Text className="mt-2">
            Use your Google account to access the Jamaica Traffic Ticket Dashboard
          </Text>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
            <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
          </div>
        )}

        <div className="mt-10">
          <Button
            onClick={handleGoogleLogin}
            outline
            className="w-full items-center! justify-center gap-3 py-3"
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign up
            </Link>
          </Text>
        </div>
      </div>
    </AuthLayout>
  )
}
