import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import 'animate.css'
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
        {/* Inline critical theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              let e = localStorage.getItem('theme')
              document.documentElement.setAttribute(
                'data-bs-theme',
                e === '"light"' || e === '"dark"'
                  ? JSON.parse(e)
                  : window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light',
              )
            } catch (e) {}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header session={session} />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
