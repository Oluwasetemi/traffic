'use client'

import { useState, useEffect } from 'react'
import { Button } from '../button'
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)
    if (isIOSDevice) {
      setShowPrompt(true)
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, Samsung Internet)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  async function handleInstallClick() {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  function handleClose() {
    setShowPrompt(false)
  }

  if (isInstalled || !showPrompt) {
    return null
  }

  if (isIOS) {
    return (
      <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 bg-white dark:bg-zinc-900 rounded-2xl p-6 ring-1 ring-zinc-950/5 dark:ring-white/10 shadow-xl z-50">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label="Close"
        >
          <XMarkIcon className="size-5" />
        </button>

        <div className="flex items-start gap-3">
          <ArrowDownTrayIcon className="size-6 text-primary shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-white mb-2">
              Install Jamaica Traffic App
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              Install this app on your iPhone:
            </p>
            <ol className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 list-decimal list-inside">
              <li>
                Tap the <strong>Share</strong> button{' '}
                <span className="inline-block">
                  <svg className="inline size-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v5.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 9.586V4a1 1 0 011-1z" />
                    <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                  </svg>
                </span>
              </li>
              <li>
                Select <strong>Add to Home Screen</strong>
              </li>
              <li>
                Tap <strong>Add</strong>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 bg-white dark:bg-zinc-900 rounded-2xl p-6 ring-1 ring-zinc-950/5 dark:ring-white/10 shadow-xl z-50">
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        aria-label="Close"
      >
        <XMarkIcon className="size-5" />
      </button>

      <div className="flex items-start gap-3 mb-4">
        <ArrowDownTrayIcon className="size-6 text-primary shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
            Install Jamaica Traffic App
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Add to your home screen for quick access and offline support
          </p>
        </div>
      </div>

      <Button
        onClick={handleInstallClick}
        color="green"
        className="w-full"
      >
        Install App
      </Button>
    </div>
  )
}
