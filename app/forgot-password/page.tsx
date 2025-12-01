'use client'

import { useState } from 'react'
import { Link } from '../components/link'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Field, Label, ErrorMessage, Description } from '../components/fieldset'
import { AuthLayout } from '../components/auth-layout'
import { Heading } from '../components/heading'
import { Text } from '../components/text'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Map<string, string>>(new Map())
  const [email, setEmail] = useState('')

  const validateEmail = (value: string): string | null => {
    if (!value) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)

    // Clear error when user starts typing
    if (fieldErrors.has('email')) {
      const newErrors = new Map(fieldErrors)
      newErrors.delete('email')
      setFieldErrors(newErrors)
    }
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate email
    const emailError = validateEmail(email)
    if (emailError) {
      setFieldErrors(new Map([['email', emailError]]))
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual password reset
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSuccess(true)
    } catch (err) {
      setError('Failed to send reset link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <svg
              className="size-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <Heading level={1} className="mt-6">
            Check your email
          </Heading>
          <Text className="mt-2">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </Text>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="font-medium underline hover:no-underline"
              >
                try again
              </button>
            </p>
          </div>

          <div className="mt-8">
            <Link href="/login">
              <Button outline className="w-full">
                <ArrowLeftIcon />
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heading level={1}>Reset your password</Heading>
          <Text className="mt-2">
            Enter your email address and we&apos;ll send you a link to reset your password
          </Text>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
            <p className="text-sm text-red-900 dark:text-red-100">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Field>
            <Label>Email address</Label>
            <Description>We&apos;ll send a password reset link to this email</Description>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              invalid={fieldErrors.has('email')}
            />
            {fieldErrors.has('email') && (
              <ErrorMessage>{fieldErrors.get('email')}</ErrorMessage>
            )}
          </Field>

          <div>
            <Button type="submit" color="blue" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </div>

          <div className="text-center">
            <Link href="/login">
              <Button plain>
                <ArrowLeftIcon />
                Back to sign in
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
