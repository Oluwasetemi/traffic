/* eslint-disable no-undef */
/* global self, clients */

/**
 * Service Worker for Jamaica Traffic Ticket Dashboard PWA
 * Handles push notifications
 */

const CACHE_NAME = 'jm-traffic-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(clients.claim());
});

// Push event - Handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received:', event);

  let data = {
    title: 'Jamaica Traffic Dashboard',
    body: 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge.png',
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'view',
        title: 'View Dashboard',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click:', event);

  event.notification.close();

  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification closed:', event);
});
