import * as React from 'react'

export const metadata = {
  title: 'Ben Herila',
  description: 'Ben Herila\'s personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
              {children}
      </body>
    </html>
  )
}
