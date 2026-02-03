import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jamaica Traffic Ticket Dashboard',
    short_name: 'JM Traffic',
    description: 'Look up and manage traffic tickets in Jamaica',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAF9',
    theme_color: '#009B3A',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
