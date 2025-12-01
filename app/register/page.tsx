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
import { GitHubIcon, GoogleIcon } from '../login/page'

export default function RegisterPage() {
  const router = useTransitionRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Map<string, string>>(new Map())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required'
        if (value.length < 2) return 'Name must be at least 2 characters'
        return null
      case 'email':
        if (!value) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
        return null
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return 'Password must contain uppercase, lowercase, and number'
        return null
      case 'confirmPassword':
        if (!value) return 'Please confirm your password'
        if (value !== formData.password) return 'Passwords do not match'
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
      // TODO: Implement actual registration
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center">
          <Heading level={1}>Create your account</Heading>
          <Text className="mt-2">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign in
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
            <Label>Full name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
              required
              invalid={fieldErrors.has('name')}
            />
            {fieldErrors.has('name') && (
              <ErrorMessage>{fieldErrors.get('name')}</ErrorMessage>
            )}
          </Field>

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
              autoComplete="new-password"
              required
              invalid={fieldErrors.has('password')}
            />
            {fieldErrors.has('password') && (
              <ErrorMessage>{fieldErrors.get('password')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Confirm password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
              invalid={fieldErrors.has('confirmPassword')}
            />
            {fieldErrors.has('confirmPassword') && (
              <ErrorMessage>{fieldErrors.get('confirmPassword')}</ErrorMessage>
            )}
          </Field>

          <CheckboxField>
            <Checkbox name="terms" required />
            <Label>
              I agree to the <Link href="/terms">Terms of Service</Link> and{' '}
              <Link href="/privacy">Privacy Policy</Link>
            </Label>
          </CheckboxField>

          <div>
            <Button type="submit" color="blue" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create account'}
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
