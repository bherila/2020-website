'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-24 py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <p className="text-sm text-muted-foreground">&copy; 2024 Ben Herila</p>
        <nav className="flex gap-4">
          <Link
            href="/legal/accessibility"
            className="text-sm text-muted-foreground hover:text-primary"
            aria-label="Accessibility page"
          >
            Accessibility
          </Link>
          <Link
            href="/legal/privacy"
            className="text-sm text-muted-foreground hover:text-primary"
            aria-label="Privacy page"
          >
            Privacy
          </Link>
          <Link
            href="/legal/terms"
            className="text-sm text-muted-foreground hover:text-primary"
            aria-label="Terms of service page"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
