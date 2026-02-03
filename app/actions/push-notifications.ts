'use server'

import webpush, { PushSubscription as WebPushSubscription } from 'web-push'
import { db } from '../lib/db'
import { pushSubscription } from '../lib/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY

if (!publicKey || !privateKey) {
  console.error('VAPID keys not configured. Push notifications will not work.')
}

if (publicKey && privateKey) {
  webpush.setVapidDetails(
    'mailto:traffic@jamaica.gov.jm',
    publicKey,
    privateKey
  )
}

// Database-backed subscription storage

export async function subscribeUser(subscription: WebPushSubscription, userId: string) {
  try {
    // Store subscription in database
    const endpoint = subscription.endpoint
    const keys = subscription.keys

    // Check if subscription already exists
    const existing = await db
      .select()
      .from(pushSubscription)
      .where(eq(pushSubscription.endpoint, endpoint))
      .limit(1)

    if (existing.length > 0) {
      // Update existing subscription
      await db
        .update(pushSubscription)
        .set({
          p256dh: keys.p256dh,
          auth: keys.auth,
          expirationTime: subscription.expirationTime ? new Date(subscription.expirationTime) : null,
          updatedAt: new Date(),
        })
        .where(eq(pushSubscription.endpoint, endpoint))
    } else {
      // Insert new subscription
      await db.insert(pushSubscription).values({
        id: nanoid(),
        userId,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        expirationTime: subscription.expirationTime ? new Date(subscription.expirationTime) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    console.log('User subscribed')

    return { success: true, message: 'Subscribed successfully' }
  } catch (error) {
    console.error('Subscription error:', error)
    return { success: false, message: 'Failed to subscribe' }
  }
}

export async function unsubscribeUser(endpoint: string) {
  try {
    await db.delete(pushSubscription).where(eq(pushSubscription.endpoint, endpoint))

    console.log('User unsubscribed')

    return { success: true, message: 'Unsubscribed successfully' }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return { success: false, message: 'Failed to unsubscribe' }
  }
}

export async function sendNotification(message: string, targetUserId?: string) {
  try {
    const payload = JSON.stringify({
      title: 'Jamaica Traffic Dashboard',
      body: message,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge.png',
    })

    // Fetch subscriptions from database
    const subscriptionsQuery = targetUserId
      ? db.select().from(pushSubscription).where(eq(pushSubscription.userId, targetUserId))
      : db.select().from(pushSubscription)

    const subscriptions = await subscriptionsQuery

    // Send to all subscribed users
    const promises: Promise<unknown>[] = []
    const initialCount = subscriptions.length

    for (const sub of subscriptions) {
      const webPushSubscription: WebPushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      }

      promises.push(
        webpush.sendNotification(webPushSubscription, payload).catch(async (error) => {
          console.error('Error sending notification:', error)
          // Only remove subscription if it's permanently gone (410)
          if (error?.statusCode === 410) {
            await db.delete(pushSubscription).where(eq(pushSubscription.id, sub.id))
          }
        })
      )
    }

    await Promise.all(promises)

    return {
      success: true,
      message: `Notification sent to ${initialCount} subscribers`,
    }
  } catch (error) {
    console.error('Send notification error:', error)
    return { success: false, message: 'Failed to send notification' }
  }
}

export async function getSubscriptionCount() {
  try {
    const count = await db.select().from(pushSubscription)
    return count.length
  } catch (error) {
    console.error('Error getting subscription count:', error)
    return 0
  }
}
