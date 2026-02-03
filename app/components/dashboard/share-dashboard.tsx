'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogBody, DialogActions, DialogTitle } from '../dialog'
import { Button } from '../button'
import {
  ShareIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { captureElement, captureElementAsBlob, downloadImage, shareImage } from '../../lib/screenshot'
import { renderComponentToImage, renderComponentToBlob } from '../../lib/takumi-renderer'
import { ShareCardComponent } from '../../lib/generate-share-card'
import type { TicketSearchResponse } from '../../types'

interface ShareDashboardProps {
  isOpen: boolean
  onClose: () => void
  dashboardRef: React.RefObject<HTMLElement | null>
  data: TicketSearchResponse | null
}

export function ShareDashboard({ isOpen, onClose, dashboardRef, data }: ShareDashboardProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [captureMode, setCaptureMode] = useState<'card' | 'screenshot'>('card')

  async function handleGenerateReportCard() {
    if (!data) return

    setIsCapturing(true)
    setError(null)

    try {
      const cardData = {
        totalTickets: data.totalTickets || 0,
        outstanding: data.outstanding || 0,
        paid: (data.totalTickets || 0) - (data.outstanding || 0),
        totalOutstanding: data.totalOutstanding || 0,
        demeritPoints: data.tickets?.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0) || 0,
      }

      const dataUrl = await renderComponentToImage(
        <ShareCardComponent data={cardData} />,
        {
          width: 1920,
          height: 1080,
          format: 'png',
        }
      )

      setPreviewUrl(dataUrl)
      setCaptureMode('card')
    } catch (err) {
      console.error('Report card generation error:', err)
      setError('Failed to generate report card')
    } finally {
      setIsCapturing(false)
    }
  }

  async function handleCaptureDashboard() {
    if (!dashboardRef.current) return

    setIsCapturing(true)
    setError(null)

    try {
      const dataUrl = await captureElement(dashboardRef.current)
      setPreviewUrl(dataUrl)
      setCaptureMode('screenshot')
    } catch (err) {
      console.error('Capture error:', err)
      setError('Failed to capture screenshot')
    } finally {
      setIsCapturing(false)
    }
  }

  async function handleDownload() {
    if (!previewUrl) return

    const filename = captureMode === 'card'
      ? `jamaica-traffic-report-${Date.now()}.png`
      : `dashboard-screenshot-${Date.now()}.png`

    downloadImage(previewUrl, filename)
  }

  async function handleDownloadMobile() {
    if (!data) return

    setIsCapturing(true)
    setError(null)

    try {
      const cardData = {
        totalTickets: data.totalTickets || 0,
        outstanding: data.outstanding || 0,
        paid: (data.totalTickets || 0) - (data.outstanding || 0),
        totalOutstanding: data.totalOutstanding || 0,
        demeritPoints: data.tickets?.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0) || 0,
      }

      const dataUrl = await renderComponentToImage(
        <ShareCardComponent data={cardData} />,
        {
          width: 1080,
          height: 1920,
          format: 'png',
          mobile: true,
        }
      )

      downloadImage(dataUrl, `jamaica-traffic-story-${Date.now()}.png`)
      setPreviewUrl(dataUrl)
      setCaptureMode('card')
    } catch (err) {
      console.error('Mobile download error:', err)
      setError('Failed to generate mobile version')
    } finally {
      setIsCapturing(false)
    }
  }

  async function handleShare() {
    setIsCapturing(true)
    setError(null)

    try {
      let blob: Blob

      if (captureMode === 'card' && data) {
        const cardData = {
          totalTickets: data.totalTickets || 0,
          outstanding: data.outstanding || 0,
          paid: (data.totalTickets || 0) - (data.outstanding || 0),
          totalOutstanding: data.totalOutstanding || 0,
          demeritPoints: data.tickets?.reduce((sum, ticket) => sum + (ticket.demeritPoints || 0), 0) || 0,
        }

        blob = await renderComponentToBlob(
          <ShareCardComponent data={cardData} />,
          {
            width: 1920,
            height: 1080,
            format: 'png',
          }
        )
      } else if (dashboardRef.current) {
        blob = await captureElementAsBlob(dashboardRef.current)
      } else {
        throw new Error('Nothing to share')
      }

      const canNativeShare = navigator.share && navigator.canShare
      if (canNativeShare) {
        await shareImage(blob, 'Jamaica Traffic Ticket Report Card')
        // Don't fallback on cancel - user made a choice
      } else {
        // Native share not available, offer social options
        handleSocialShare('twitter')
      }
    } catch (err) {
      console.error('Share error:', err)
      setError('Failed to share')
    } finally {
      setIsCapturing(false)
    }
  }

  function handleSocialShare(platform: 'twitter' | 'facebook' | 'linkedin' | 'whatsapp') {
    const url = window.location.origin

    const cardText = captureMode === 'card'
      ? 'Check out my Jamaica Traffic Ticket Report Card! 🇯🇲 Stay safe on the roads! built by @setemiojo'
      : 'Managing my traffic tickets with Jamaica Traffic Dashboard 🇯🇲'

    const shareUrls = {
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(cardText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?&quote=${encodeURIComponent(cardText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(cardText + '\n\n' + url)}`,
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Could add a toast notification here
    } catch (err) {
      console.error('Copy error:', err)
    }
  }

  // Auto-generate report card when dialog opens
  useEffect(() => {
    if (isOpen && !previewUrl && data) {
      handleGenerateReportCard()
    }
  }, [isOpen, previewUrl, data])

  // Clear preview when data changes to force regeneration
  useEffect(() => {
    setPreviewUrl(null)
  }, [data])

  return (
    <Dialog open={isOpen} onClose={onClose} size="3xl">
      <DialogTitle>Share Your Traffic Report</DialogTitle>
      <DialogBody>
        <div className="space-y-4">
          {/* Mode Selection */}
          <div className="flex gap-2">
            <Button
              onClick={handleGenerateReportCard}
              color={captureMode === 'card' ? 'green' : 'zinc'}
              disabled={isCapturing || !data}
              className="flex-1"
            >
              <SparklesIcon className="size-4 mr-2" />
              Report Card (16:9)
            </Button>
            <Button
              onClick={handleDownloadMobile}
              color={captureMode === 'card' ? 'green' : 'zinc'}
              disabled={isCapturing || !data}
              className="flex-1"
            >
              <PhotoIcon className="size-4 mr-2" />
              Mobile Version (9:16)
            </Button>
          </div>

          {/* Preview */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            {isCapturing ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                  <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {captureMode === 'card' ? 'Generating report card...' : 'Capturing screenshot...'}
                  </p>
                </div>
              </div>
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt={captureMode === 'card' ? 'Report card preview' : 'Dashboard preview'}
                className="w-full h-auto"
              />
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  <Button onClick={captureMode === 'card' ? handleGenerateReportCard : handleCaptureDashboard} className="mt-4">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Actions */}
          {previewUrl && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleDownload}
                  color="green"
                  className="flex-1 sm:flex-none"
                >
                  <ArrowDownTrayIcon className="size-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handleShare}
                  color="amber"
                  className="flex-1 sm:flex-none"
                >
                  <ShareIcon className="size-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Social Media Buttons */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Share on social media
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    onClick={() => handleSocialShare('twitter')}
                    outline
                    className="text-sm"
                  >
                    Twitter/X
                  </Button>
                  <Button
                    onClick={() => handleSocialShare('facebook')}
                    outline
                    className="text-sm"
                  >
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleSocialShare('linkedin')}
                    outline
                    className="text-sm"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    onClick={() => handleSocialShare('whatsapp')}
                    outline
                    className="text-sm"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>

              {/* Copy Link */}
              {/*<div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <Button onClick={handleCopyLink} outline className="w-full text-sm">
                  Copy Dashboard Link
                </Button>
              </div>*/}
            </div>
          )}
        </div>
      </DialogBody>
      <DialogActions>
        <Button onClick={onClose} plain>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ShareButtonProps {
  dashboardRef: React.RefObject<HTMLElement | null>
  data: TicketSearchResponse | null
}

export function ShareButton({ dashboardRef, data }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 size-14 rounded-full bg-linear-to-r from-[#009B3A] to-[#FFC72C] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Share dashboard"
      >
        <ShareIcon className="size-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      <ShareDashboard
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        dashboardRef={dashboardRef}
        data={data}
      />
    </>
  )
}
