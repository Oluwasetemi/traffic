'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createDate, isBefore, isAfter, addYears } from '@setemiojo/utils'
import { Temporal } from 'temporal-polyfill'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Field, Label, Description, ErrorMessage } from '../components/fieldset'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '../components/alert'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import type { DriverLicenseValidationRequest } from '../types'

export default function LookupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Map<string, string>>(new Map())
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
      const response = await fetch('/api/validate-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData as DriverLicenseValidationRequest),
      })

      if (!response.ok) {
        throw new Error('Failed to validate license')
      }

      const isValid = await response.json()

      if (isValid) {
        // License is valid, now fetch tickets
        const ticketsResponse = await fetch('/api/search-tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            driversLicNo: formData.driversLicNo,
            controlNo: formData.controlNo,
            dateOfBirth: formData.dateOfBirth,
            origLicIssueDate: formData.origLicIssueDate,
          }),
        })

        if (ticketsResponse.ok) {
          const ticketData = await ticketsResponse.json()
          sessionStorage.setItem('licenseData', JSON.stringify(formData))
          sessionStorage.setItem('ticketData', JSON.stringify(ticketData))
          router.push('/dashboard')
        } else {
          sessionStorage.setItem('licenseData', JSON.stringify(formData))
          router.push('/dashboard')
        }
      } else {
        setError('Invalid driver\'s license information. Please check your details and try again.')
      }
    } catch (err) {
      setError('An error occurred while validating your license. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-5xl">
            License Validation
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Enter your driver's license information to view your traffic ticket records
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Field>
            <Label>Driver&apos;s License Number</Label>
            <Description>Enter your 9-digit license number</Description>
            <Input
              type="text"
              name="driversLicNo"
              value={formData.driversLicNo}
              onChange={handleInputChange}
              maxLength={9}
              required
              invalid={fieldErrors.has('driversLicNo')}
            />
            {fieldErrors.has('driversLicNo') && (
              <ErrorMessage>{fieldErrors.get('driversLicNo')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Control Number</Label>
            <Description>Enter your 10-digit control number</Description>
            <Input
              type="text"
              name="controlNo"
              value={formData.controlNo}
              onChange={handleInputChange}
              maxLength={10}
              required
              invalid={fieldErrors.has('controlNo')}
            />
            {fieldErrors.has('controlNo') && (
              <ErrorMessage>{fieldErrors.get('controlNo')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Original License Issue Date</Label>
            <Description>When was your license first issued?</Description>
            <Input
              type="date"
              name="origLicIssueDate"
              value={formData.origLicIssueDate}
              onChange={handleInputChange}
              required
              invalid={fieldErrors.has('origLicIssueDate')}
            />
            {fieldErrors.has('origLicIssueDate') && (
              <ErrorMessage>{fieldErrors.get('origLicIssueDate')}</ErrorMessage>
            )}
          </Field>

          <Field>
            <Label>Date of Birth</Label>
            <Description>Enter your date of birth</Description>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              invalid={fieldErrors.has('dateOfBirth')}
            />
            {fieldErrors.has('dateOfBirth') && (
              <ErrorMessage>{fieldErrors.get('dateOfBirth')}</ErrorMessage>
            )}
          </Field>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading || fieldErrors.size > 0} className="flex-1">
              <MagnifyingGlassIcon className="h-5 w-5" />
              {isLoading ? 'Validating...' : 'Validate & Search'}
            </Button>
            <Button
              type="button"
              outline
              onClick={() => router.push('/dashboard')}
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
      </main>
    </div>
  )
}
