'use client'

import { useState, useEffect } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from '../../actions/push-notifications'
import { Button } from '../button'
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline'
import { useSession } from '../../lib/auth-client'

export function PushNotificationManager() {
  const { data: session } = useSession()
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      checkSubscription()
    }
  }, [])

  async function checkSubscription() {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })
      console.log('Service Worker registered:', registration)
      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      throw error
    }
  }

  async function handleSubscribe() {
    setIsLoading(true)
    setMessage('')

    try {
      // Request notification permission
      const permission = await Notification.requestPermission()

      if (permission !== 'granted') {
        setMessage('Notification permission denied')
        setIsLoading(false)
        return
      }

      // Register service worker
      const registration = await registerServiceWorker()
      await navigator.serviceWorker.ready

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) {
        setMessage('Push notifications are not configured')
        setIsLoading(false)
        return
      }

      // Subscribe to push notifications
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      })

      // Send subscription to server
      const subData = sub.toJSON()
      
      if (!session?.user?.id) {
        setMessage('You must be logged in to enable notifications')
        setIsLoading(false)
        return
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await subscribeUser(subData as any, session.user.id)

      if (result.success) {
        setSubscription(sub)
        setMessage('Subscribed to notifications!')
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setMessage('Failed to subscribe')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUnsubscribe() {
    if (!subscription) return

    setIsLoading(true)
    setMessage('')

    try {
      await subscription.unsubscribe()
      await unsubscribeUser(subscription.endpoint)

      setSubscription(null)
      setMessage('Unsubscribed from notifications')
    } catch (error) {
      console.error('Unsubscribe error:', error)
      setMessage('Failed to unsubscribe')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleTestNotification() {
    setIsLoading(true)
    setMessage('')

    try {
      const result = await sendNotification('This is a test notification!')

      setMessage(result.message)
    } catch (error) {
      console.error('Test notification error:', error)
      setMessage('Failed to send test notification')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 p-6 ring-1 ring-zinc-950/5 dark:ring-white/10">
      <div className="flex items-center gap-3 mb-4">
        {subscription ? (
          <BellIcon className="size-6 text-primary" />
        ) : (
          <BellSlashIcon className="size-6 text-zinc-400" />
        )}
        <div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
            Push Notifications
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {subscription
              ? 'Get notified about ticket updates'
              : 'Enable notifications for ticket updates'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {!subscription ? (
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            color="green"
          >
            {isLoading ? 'Subscribing...' : 'Enable Notifications'}
          </Button>
        ) : (
          <>
            <Button
              onClick={handleTestNotification}
              disabled={isLoading}
              color="amber"
            >
              {isLoading ? 'Sending...' : 'Test Notification'}
            </Button>
            <Button
              onClick={handleUnsubscribe}
              disabled={isLoading}
              outline
            >
              {isLoading ? 'Unsubscribing...' : 'Disable Notifications'}
            </Button>
          </>
        )}
      </div>

      {message && (
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
      )}
    </div>
  )
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
