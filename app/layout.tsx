import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions';
import { ThemeProvider } from "./components/theme-provider";
import { StackedLayout } from "./components/stacked-layout";
import { AppNavbar } from "./components/app-navbar";
import { AppSidebar } from "./components/app-sidebar";
import Footer from "./components/ui/footer";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono, Inter } from 'next/font/google';

// Font configurations
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

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
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${bricolageGrotesque.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${inter.variable}`}
      >
        <head>
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
        <body className={`antialiased ${dmSans.className}`}>
          {/* Jamaica Flag Accent Bar */}
          <div className="jamaica-flag-accent">
            <span></span>
          </div>
          <ThemeProvider>
            <StackedLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
              {children}
              <Footer />
            </StackedLayout>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
