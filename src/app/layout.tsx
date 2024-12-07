import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import 'animate.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import getServerSession from '@/server_lib/getServerSession'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === '"light"' || theme === '"dark"') {
                  document.documentElement.setAttribute('data-bs-theme', JSON.parse(theme));
                } else if (!theme && window.matchMedia('(prefers-color-scheme: light)').matches) {
                  document.documentElement.setAttribute('data-bs-theme', 'light');
                }
              } catch (e) {}
            `,
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
