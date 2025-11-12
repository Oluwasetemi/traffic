import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
  description: 'Complete reference of Jamaica traffic violations, fines, and demerit points under the Road Traffic Act 2018.',
  openGraph: {
    title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
    description: 'Complete reference of violations and demerit points',
    type: 'website',
    images: [
      {
        url: '/og-images/offences-og.png',
        width: 1200,
        height: 630,
        alt: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
    description: 'Complete reference of violations and demerit points',
    images: ['/og-images/offences-og.png'],
    creator: "@setemiojo",
  },
}

export default function OffencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
