import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { AppNavbar } from "./components/app-navbar";
import Footer from "./components/ui/footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
  'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Jamaica Traffic Ticket Dashboard",
  description: "Look up and manage traffic tickets in Jamaica. Built with the official Jamaica Traffic Ticket Lookup API.",
  keywords: ["Jamaica", "traffic tickets", "driver's license", "violations", "fines"],
  authors: [{ name: "Jamaica Traffic Ticket Dashboard" }],
  icons: {
    icon: "https://fav.farm/🚦",
  },
  openGraph: {
    title: "Jamaica Traffic Ticket Dashboard",
    description: "Look up and manage traffic tickets in Jamaica",
    type: "website",
    images: [
      {
        url: "/og-images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Jamaica Traffic Ticket Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamaica Traffic Ticket Dashboard",
    description: "Look up and manage traffic tickets in Jamaica",
    images: ["/og-images/opengraph-image.png"],
    creator: "@setemiojo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AppNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
