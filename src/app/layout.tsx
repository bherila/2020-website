import 'bootstrap/dist/css/bootstrap.css'
import * as React from 'react'
import 'animate.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import getServerSession from '@/server_lib/getServerSession'

export const metadata = {
  title: 'Ben Herila',
  description: "Ben Herila's personal website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body data-bs-theme="dark">
        <Header session={session} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
