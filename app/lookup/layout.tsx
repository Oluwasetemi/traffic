import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'License Validation - Jamaica Traffic Ticket Dashboard',
  description: 'Validate your driver\'s license and look up your traffic tickets using the official Jamaica government database.',
  openGraph: {
    title: 'License Validation - Jamaica Traffic Ticket Dashboard',
    description: 'Validate your license and look up traffic tickets',
    type: 'website',
    images: [
      {
        url: '/og-images/lookup-og.png',
        width: 1200,
        height: 630,
        alt: 'License Validation - Jamaica Traffic Ticket Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License Validation - Jamaica Traffic Ticket Dashboard',
    description: 'Validate your license and look up traffic tickets',
    images: ['/og-images/lookup-og.png'],
    creator: "@setemiojo",
  },
}

export default function LookupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
