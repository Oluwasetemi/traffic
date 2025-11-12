import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
  description: 'Complete reference of Jamaica traffic violations, fines, and demerit points under the Road Traffic Act 2018.',
  openGraph: {
    title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
    description: 'Complete reference of violations and demerit points',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traffic Offences & Fines - Jamaica Traffic Ticket Dashboard',
    description: 'Complete reference of violations and demerit points',
  },
}

export default function OffencesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
