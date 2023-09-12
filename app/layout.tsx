import "@/styles/globals.css"

import { Metadata } from "next"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Bar from "@/components/bar"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaProvider } from "@/components/wrappers/solana-provider"
import Toaster from "@/components/wrappers/sonner-toaster"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SolanaProvider>
              <div className="relative flex flex-col min-h-screen">
                <SiteHeader />
                <Toaster />
                <div className="flex-1">{children}</div>
                <Bar />
                {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
                  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
                    <Script
                      src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
                      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
                      strategy="lazyOnload"
                    />
                  )}
              </div>
            </SolanaProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
