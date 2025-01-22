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
        {/* Bootstrap CSS from CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        {/* Bootstrap Icons from CDN */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
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
