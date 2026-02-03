'use client'

import { useState } from 'react'
import { Link } from '../components/link'
import { Button } from '../components/button'
import { AuthLayout } from '../components/auth-layout'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { GoogleIcon } from '../login/page'
import { signIn } from '../lib/auth-client'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn.social({
        provider: 'google',
        callbackURL: '/lookup',
      })

      // If redirect is false, the flow failed and no redirect will occur
      if (!result.redirect) {
        setError('Failed to create account with Google. Please try again.')
        setIsLoading(false)
      }
      // If redirect is true, Better Auth will navigate to the provider's auth URL
    } catch {
      setError('Failed to create account with Google. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heading level={1}>Create your account</Heading>
          <Text className="mt-2">
            Use your Google account to get started with the Jamaica Traffic Ticket Dashboard
          </Text>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
            <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
          </div>
        )}

        <div className="mt-10">
          <Button
            onClick={handleGoogleSignup}
            outline
            className="w-full items-center! justify-center gap-3 py-3"
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>{isLoading ? 'Creating account...' : 'Continue with Google'}</span>
          </Button>
        </div>

        <div className="mt-8">
          <Text className="text-xs text-center text-zinc-600 dark:text-zinc-400">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </Text>
        </div>

        <div className="mt-8 text-center">
          <Text className="text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in
            </Link>
          </Text>
        </div>
      </div>
    </AuthLayout>
  )
}
