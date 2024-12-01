import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import HeaderWrapper from '@/components/header-wrapper'
import 'animate.css'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-bs-theme="dark">
        <HeaderWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
