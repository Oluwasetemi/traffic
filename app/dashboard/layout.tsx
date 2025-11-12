import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Jamaica Traffic Ticket Dashboard',
  description: 'View your traffic tickets, fines, outstanding payments, and demerit points in your personalized dashboard.',
  openGraph: {
    title: 'Dashboard - Jamaica Traffic Ticket Dashboard',
    description: 'View your tickets, fines, and demerit points',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard - Jamaica Traffic Ticket Dashboard',
    description: 'View your tickets, fines, and demerit points',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
