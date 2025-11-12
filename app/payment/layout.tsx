import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
  description: 'Learn about multiple convenient payment options for Jamaica traffic tickets including online, mobile app, and in-person methods.',
  openGraph: {
    title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
    description: 'Multiple convenient payment options available',
    type: 'website',
    images: [
      {
        url: '/og-images/payment-og.png',
        width: 1200,
        height: 630,
        alt: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
    description: 'Multiple convenient payment options available',
    images: ['/og-images/payment-og.png'],
    creator: "@setemiojo",
  },
}

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
