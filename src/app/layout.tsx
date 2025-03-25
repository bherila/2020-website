import './globals.css'
import * as React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { getSession } from '@/server_lib/session'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body className="min-h-screen bg-background text-foreground flex flex-col pt-16">
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <Header session={session} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextThemesProvider>
      </body>
    </html>
  )
}
