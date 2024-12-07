'use client'
import { usePathname } from 'next/navigation'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

export default function LabsRawNavigation() {
  const pathname = usePathname()

  const normalizedPathname = pathname.replace(/\/+$/, '')

  return (
    <Nav variant="tabs" className="mb-3">
      <Nav.Item>
        <Link href="/phr/labs-raw" className={`nav-link ${normalizedPathname === '/phr/labs-raw' ? 'active' : ''}`}>
          View
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          href="/phr/labs-raw/import"
          className={`nav-link ${normalizedPathname === '/phr/labs-raw/import' ? 'active' : ''}`}
        >
          Import
        </Link>
      </Nav.Item>
    </Nav>
  )
}
