'use server'

import webpush, { PushSubscription as WebPushSubscription } from 'web-push'

// Configure web-push with VAPID details
const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
}

webpush.setVapidDetails(
  'mailto:traffic@jamaica.gov.jm',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

// In-memory storage for subscriptions (use database in production)
const subscriptions = new Map<string, WebPushSubscription>()

export async function subscribeUser(subscription: WebPushSubscription) {
  try {
    // Store subscription (in production, save to database)
    const endpoint = subscription.endpoint
    subscriptions.set(endpoint, subscription)

    console.log('User subscribed:', endpoint)

    return { success: true, message: 'Subscribed successfully' }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, message: 'Failed to subscribe' }
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    subscriptions.delete(endpoint)
    console.log('User unsubscribed:', endpoint)

    return { success: true, message: 'Unsubscribed successfully' }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return { success: false, message: 'Failed to unsubscribe' }
  }
}

export async function sendNotification(message: string) {
  try {
    const payload = JSON.stringify({
      title: 'Jamaica Traffic Dashboard',
      body: message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge.png',
    })

    // Send to all subscribed users
    const promises: Promise<unknown>[] = []

    subscriptions.forEach((subscription) => {
      promises.push(
        webpush.sendNotification(subscription, payload).catch((error) => {
          console.error('Error sending notification:', error)
          // Remove failed subscription
          subscriptions.delete(subscription.endpoint)
        })
      )
    })

    await Promise.all(promises)

    return {
      success: true,
      message: `Notification sent to ${subscriptions.size} subscribers`,
    }
  } catch (error) {
    console.error('Send notification error:', error)
    return { success: false, message: 'Failed to send notification' }
  }
}

export async function getSubscriptionCount() {
  return subscriptions.size
}
