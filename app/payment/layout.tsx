import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
  description: 'Learn about multiple convenient payment options for Jamaica traffic tickets including online, mobile app, and in-person methods.',
  openGraph: {
    title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
    description: 'Multiple convenient payment options available',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pay Traffic Tickets - Jamaica Traffic Ticket Dashboard',
    description: 'Multiple convenient payment options available',
  },
}

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
