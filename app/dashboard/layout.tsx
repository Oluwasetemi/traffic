import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Jamaica Traffic Ticket Dashboard",
  description:
    "View your traffic tickets, fines, outstanding payments, and demerit points in your personalized dashboard.",
  openGraph: {
    title: "Dashboard - Jamaica Traffic Ticket Dashboard",
    description: "View your tickets, fines, and demerit points",
    type: "website",
    images: [
      {
        url: "/og-images/dashboard-og.png",
        width: 1200,
        height: 630,
        alt: "Dashboard - Jamaica Traffic Ticket Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard - Jamaica Traffic Ticket Dashboard",
    description: "View your tickets, fines, and demerit points",
    images: ["/og-images/dashboard-og.png"],
    creator: "@setemiojo",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
