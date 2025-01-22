import './globals.css'
import * as React from 'react'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { getSession } from '@/server_lib/session'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              let e = localStorage.getItem('theme')
              document.documentElement.classList.toggle(
                'dark',
                e === '"light"' || e === '"dark"'
                  ? JSON.parse(e) === 'dark'
                  : window.matchMedia('(prefers-color-scheme: dark)').matches
              )
            } catch (e) {}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider>
          <Header session={session} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
