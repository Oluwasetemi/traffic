'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useTransitionRouter } from 'next-view-transitions'
import { createDate, isBefore, isAfter, addYears } from '@setemiojo/utils'
import { Temporal } from 'temporal-polyfill'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Field, Label, Description, ErrorMessage } from '../components/fieldset'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '../components/alert'
import { MagnifyingGlassIcon, CameraIcon } from '@heroicons/react/24/outline'
import type { DriverLicenseValidationRequest } from '../types'
import type { ExtractedLicenseData } from '../types/ocr'

// Lazy load LicenseCapture component with heavy OCR dependencies
const LicenseCapture = dynamic(
  () => import('../components/license-capture').then((mod) => ({ default: mod.LicenseCapture })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8" role="status" aria-live="polite">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Loading camera...</p>
        </div>
      </div>
    ),
    ssr: false, // Disable SSR since it uses browser APIs (camera, canvas)
  }
)

export default function LookupPage() {
  const router = useTransitionRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Use lazy initialization to avoid creating new Map on every render
  const [fieldErrors, setFieldErrors] = useState<Map<string, string>>(() => new Map())
  const [isCaptureOpen, setIsCaptureOpen] = useState(false)
  // Use lazy initialization to avoid creating new Set on every render
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(() => new Set())
  const [formData, setFormData] = useState({
    driversLicNo: '',
    controlNo: '',
    origLicIssueDate: '',
    dateOfBirth: '',
  })

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'driversLicNo':
        if (!value) return "Driver's license number is required"
        if (value.length !== 9) return 'Must be exactly 9 digits'
        return null
        
      case 'controlNo':
        if (!value) return 'Control number is required'
        if (value.length !== 10) return 'Must be exactly 10 digits'
        return null
        
      case 'origLicIssueDate':
        if (!value) return 'Original license issue date is required'
        try {
          const issueDate = createDate(value)
          const today = Temporal.Now.plainDateISO()
          
          // Cannot be in the future
          if (isAfter(issueDate, today)) {
            return 'License issue date cannot be in the future'
          }
          
          // Cannot be more than 100 years ago
          const hundredYearsAgo = addYears(today, -100)
          if (isBefore(issueDate, hundredYearsAgo)) {
            return 'License issue date seems invalid'
          }
        } catch (e) {
          return 'Invalid date format'
        }
        return null
        
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required'
        try {
          const birthDate = createDate(value)
          const today = Temporal.Now.plainDateISO()
          
          // Cannot be in the future
          if (isAfter(birthDate, today)) {
            return 'Date of birth cannot be in the future'
          }
          
          // Must be at least 16 years old (minimum driving age)
          const sixteenYearsAgo = addYears(today, -16)
          if (isAfter(birthDate, sixteenYearsAgo)) {
            return 'Must be at least 16 years old to have a license'
          }
          
          // Cannot be more than 120 years ago
          const oneHundredTwentyYearsAgo = addYears(today, -120)
          if (isBefore(birthDate, oneHundredTwentyYearsAgo)) {
            return 'Date of birth seems invalid'
          }
        } catch (e) {
          return 'Invalid date format'
        }
        return null
        
      default:
        return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let processedValue = value
    // For numeric fields, only allow digits
    if (name === 'driversLicNo' || name === 'controlNo') {
      processedValue = value.replace(/\D/g, '')
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }))

    // Remove from auto-filled fields when user manually edits
    if (autoFilledFields.has(name)) {
      setAutoFilledFields((prev) => {
        const newSet = new Set(prev)
        newSet.delete(name)
        return newSet
      })
    }

    // Real-time validation
    const errorMessage = validateField(name, processedValue)
    setFieldErrors((prev) => {
      const newErrors = new Map(prev)
      if (errorMessage) {
        newErrors.set(name, errorMessage)
      } else {
        newErrors.delete(name)
      }
      return newErrors
    })

    // Clear global error when user starts typing
    setError(null)
  }

  const handleDataExtracted = (data: ExtractedLicenseData) => {
    const fieldsToFill: Set<string> = new Set()

    if (data.driversLicNo) {
      setFormData((prev) => ({ ...prev, driversLicNo: data.driversLicNo || '' }))
      fieldsToFill.add('driversLicNo')
    }

    if (data.controlNo) {
      setFormData((prev) => ({ ...prev, controlNo: data.controlNo || '' }))
      fieldsToFill.add('controlNo')
    }

    if (data.dateOfBirth) {
      setFormData((prev) => ({ ...prev, dateOfBirth: data.dateOfBirth || '' }))
      fieldsToFill.add('dateOfBirth')
    }

    if (data.origLicIssueDate) {
      setFormData((prev) => ({ ...prev, origLicIssueDate: data.origLicIssueDate || '' }))
      fieldsToFill.add('origLicIssueDate')
    }

    setAutoFilledFields(fieldsToFill)

    // Clear field errors for successfully extracted fields
    setFieldErrors(new Map())
    setError(null)
  }

  const validateForm = (): boolean => {
    const newErrors = new Map<string, string>()

    Object.entries(formData).forEach(([key, value]) => {
      const errorMessage = validateField(key, value)
      if (errorMessage) {
        newErrors.set(key, errorMessage)
      }
    })

    setFieldErrors(newErrors)
    return newErrors.size === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
      setError('Please fix the errors in the form before submitting')
      return
    }

    setIsLoading(true)

    try {
      // Combined API call: validates license AND fetches tickets in one request
      // This eliminates the waterfall pattern by handling both operations server-side
      const response = await fetch('/api/validate-and-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as DriverLicenseValidationRequest),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to validate license')
      }

      const result = await response.json()

      if (result.isValid) {
        // License is valid, save data and navigate to dashboard
        sessionStorage.setItem('licenseData', JSON.stringify(formData))
        if (result.tickets) {
          sessionStorage.setItem('ticketData', JSON.stringify(result.tickets))
        }
        router.push('/dashboard')
      } else {
        setError('Invalid driver\'s license information. Please check your details and try again.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while validating your license. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl font-display">
            License{' '}
            <span className="text-gradient">Validation</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Enter your driver&apos;s license information to view your traffic ticket records
          </p>
        </div>

        {/* Scan License Button */}
        <div className="mb-8">
          <Button
            type="button"
            onClick={() => setIsCaptureOpen(true)}
            color="blue"
            className="w-full hover-lift"
          >
            <CameraIcon className="h-5 w-5" />
            Scan License with Camera
          </Button>
          <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Or enter your information manually below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Field>
            <Label>Driver&apos;s License Number</Label>
            <Description>Enter your 9-digit license number</Description>
            <div className="relative">
              <Input
                type="text"
                name="driversLicNo"
                value={formData.driversLicNo}
                onChange={handleInputChange}
                maxLength={9}
                required
                autoComplete="off"
                invalid={fieldErrors.has('driversLicNo')}
                className={`${autoFilledFields.has('driversLicNo') ? 'ring-2 ring-green-500 dark:ring-green-400' : ''} font-mono-custom`}
              />
              {autoFilledFields.has('driversLicNo') && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 dark:text-green-400">
                  Auto-filled
                </span>
              )}
            </div>
            {fieldErrors.has('driversLicNo') && (
              <ErrorMessage>{fieldErrors.get('driversLicNo')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Control Number</Label>
            <Description>Enter your 10-digit control number</Description>
            <div className="relative">
              <Input
                type="text"
                name="controlNo"
                value={formData.controlNo}
                onChange={handleInputChange}
                maxLength={10}
                required
                autoComplete="off"
                invalid={fieldErrors.has('controlNo')}
                className={`${autoFilledFields.has('controlNo') ? 'ring-2 ring-green-500 dark:ring-green-400' : ''} font-mono-custom`}
              />
              {autoFilledFields.has('controlNo') && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 dark:text-green-400">
                  Auto-filled
                </span>
              )}
            </div>
            {fieldErrors.has('controlNo') && (
              <ErrorMessage>{fieldErrors.get('controlNo')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Original License Issue Date</Label>
            <Description>When was your license first issued?</Description>
            <div className="relative">
              <Input
                type="date"
                name="origLicIssueDate"
                value={formData.origLicIssueDate}
                onChange={handleInputChange}
                required
                autoComplete="off"
                invalid={fieldErrors.has('origLicIssueDate')}
                className={autoFilledFields.has('origLicIssueDate') ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}
              />
              {autoFilledFields.has('origLicIssueDate') && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 dark:text-green-400">
                  Auto-filled
                </span>
              )}
            </div>
            {fieldErrors.has('origLicIssueDate') && (
              <ErrorMessage>{fieldErrors.get('origLicIssueDate')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Date of Birth</Label>
            <Description>Enter your date of birth</Description>
            <div className="relative">
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                autoComplete="bday"
                invalid={fieldErrors.has('dateOfBirth')}
                className={autoFilledFields.has('dateOfBirth') ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}
              />
              {autoFilledFields.has('dateOfBirth') && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 dark:text-green-400">
                  Auto-filled
                </span>
              )}
            </div>
            {fieldErrors.has('dateOfBirth') && (
              <ErrorMessage>{fieldErrors.get('dateOfBirth')}</ErrorMessage>
            )}
          </Field>

          <div className="flex gap-4">
            <Button type="submit" color="blue" disabled={isLoading || fieldErrors.size > 0} className="flex-1 hover-lift">
              <MagnifyingGlassIcon className="h-5 w-5" />
              {isLoading ? 'Validating...' : 'Validate & Search'}
            </Button>
            <Button
              type="button"
              outline
              onClick={() => router.push('/dashboard')}
              className="hover-lift"
            >
              View Demo
            </Button>
          </div>
        </form>

        {error && (
          <Alert open={!!error} onClose={() => setError(null)} color="red" className="mt-6">
            <AlertTitle>Validation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <AlertActions>
              <Button plain onClick={() => setError(null)}>
                Dismiss
              </Button>
            </AlertActions>
          </Alert>
        )}

        {/* License Capture Modal */}
        <LicenseCapture
          isOpen={isCaptureOpen}
          onClose={() => setIsCaptureOpen(false)}
          onDataExtracted={handleDataExtracted}
        />
      </main>
    </div>
  )
}
