import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import Header from '@/components/header'
import { getSession } from '@/lib/session'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <html lang="en">
      <body data-bs-theme="dark">
        <Header session={session} />
        <main>{children}</main>
      </body>
    </html>
  )
}
