import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import Container from '@/components/container'
import Header from '@/components/header'
import SSRProvider from 'react-bootstrap/SSRProvider'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body data-bs-theme="dark">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
