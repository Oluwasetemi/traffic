import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { AppNavbar } from "./components/app-navbar";

export const metadata: Metadata = {
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
        </ThemeProvider>
      </body>
    </html>
  );
}
