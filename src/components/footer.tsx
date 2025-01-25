'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-24 py-6"
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 mx-auto">
        <p className="text-sm text-muted-foreground">&copy; 2024 Ben Herila</p>
        <nav className="flex gap-4">
          {[
            { href: '/legal/accessibility', label: 'Accessibility' },
            { href: '/legal/privacy', label: 'Privacy' },
            { href: '/legal/terms', label: 'Terms' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-primary"
              aria-label={`${label} page`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
