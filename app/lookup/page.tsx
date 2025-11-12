'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Field, Label, Description } from '../components/fieldset'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '../components/alert'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import type { DriverLicenseValidationRequest } from '../types'

export default function LookupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    driversLicNo: '',
    controlNo: '',
    origLicIssueDate: '',
    dateOfBirth: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // For numeric fields, only allow digits
    if (name === 'driversLicNo' || name === 'controlNo') {
      const numericValue = value.replace(/\D/g, '')
      setFormData((prev) => ({ ...prev, [name]: numericValue }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    setError(null)
  }

  const validateForm = () => {
    if (!formData.driversLicNo || formData.driversLicNo.length !== 9) {
      setError('Driver\'s license number must be 9 digits')
      return false
    }
    if (!formData.controlNo || formData.controlNo.length !== 10) {
      setError('Control number must be 10 digits')
      return false
    }
    if (!formData.origLicIssueDate) {
      setError('Original license issue date is required')
      return false
    }
    if (!formData.dateOfBirth) {
      setError('Date of birth is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) {
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
          // Store both license data and ticket data in sessionStorage
          sessionStorage.setItem('licenseData', JSON.stringify(formData))
          sessionStorage.setItem('ticketData', JSON.stringify(ticketData))
          router.push('/dashboard')
        } else {
          // If ticket search fails, still go to dashboard but it will show demo data
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

        <Alert open={!!error} onClose={() => setError(null)} color="red" className="mb-8">
          <AlertTitle>Validation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <AlertActions>
            <Button plain onClick={() => setError(null)}>
              Dismiss
            </Button>
          </AlertActions>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-8 ring-1 ring-zinc-950/5 dark:ring-white/10">
            <div className="space-y-6">
              <Field>
                <Label>Driver's License Number</Label>
                <Description>
                  9-digit license number {formData.driversLicNo && `(${formData.driversLicNo.length}/9)`}
                </Description>
                <Input
                  type="text"
                  inputMode="numeric"
                  name="driversLicNo"
                  value={formData.driversLicNo}
                  onChange={handleInputChange}
                  placeholder="123456789"
                  maxLength={9}
                  required
                />
              </Field>

              <Field>
                <Label>Control Number</Label>
                <Description>
                  10-digit control number from your license {formData.controlNo && `(${formData.controlNo.length}/10)`}
                </Description>
                <Input
                  type="text"
                  inputMode="numeric"
                  name="controlNo"
                  value={formData.controlNo}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                  maxLength={10}
                  required
                />
              </Field>

              <Field>
                <Label>Original License Issue Date</Label>
                <Description>Date when your license was first issued</Description>
                <Input
                  type="date"
                  name="origLicIssueDate"
                  value={formData.origLicIssueDate}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              <Field>
                <Label>Date of Birth</Label>
                <Description>Your date of birth as shown on your license</Description>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </Field>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              color="blue"
              className="flex-1"
              disabled={isLoading}
            >
              <MagnifyingGlassIcon data-slot="icon" />
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

        <div className="mt-8 rounded-xl bg-blue-50 dark:bg-blue-950/20 p-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <strong className="font-semibold text-zinc-950 dark:text-white">Privacy Note:</strong>{' '}
            Your information is only used to validate your license and retrieve ticket records.
            We do not store any personal information.
          </p>
        </div>
      </main>
    </div>
  )
}
