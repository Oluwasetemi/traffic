'use client'

import { useState } from 'react'
import { useTransitionRouter } from 'next-view-transitions'
import { Link } from '../components/link'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Field, Label, ErrorMessage, Description } from '../components/fieldset'
import { Checkbox, CheckboxField } from '../components/checkbox'
import { AuthLayout } from '../components/auth-layout'
import { Heading } from '../components/heading'
import { Text } from '../components/text'

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

export function GitHubIcon() {
  return (
    <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function LoginPage() {
  const router = useTransitionRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Map<string, string>>(new Map())
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
        return null
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        return null
      default:
        return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (fieldErrors.has(name)) {
      const newErrors = new Map(fieldErrors)
      newErrors.delete(name)
      setFieldErrors(newErrors)
    }
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate all fields
    const newErrors = new Map<string, string>()
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value)
      if (error) newErrors.set(name, error)
    })

    if (newErrors.size > 0) {
      setFieldErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // TODO: Implement actual authentication
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heading level={1}>Sign in to your account</Heading>
          <Text className="mt-2">
            Or{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              create a new account
            </Link>
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
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              invalid={fieldErrors.has('email')}
            />
            {fieldErrors.has('email') && (
              <ErrorMessage>{fieldErrors.get('email')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
              invalid={fieldErrors.has('password')}
            />
            {fieldErrors.has('password') && (
              <ErrorMessage>{fieldErrors.get('password')}</ErrorMessage>
            )}
          </Field>

          <div className="flex items-center justify-between">
            <CheckboxField>
              <Checkbox name="remember-me" />
              <Label>Remember me</Label>
            </CheckboxField>

            <div className="text-sm">
              <Link href="/forgot-password">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" color="blue" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button outline className="w-full">
              <GoogleIcon />
              Google
            </Button>
            <Button outline className="w-full">
              <GitHubIcon />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
