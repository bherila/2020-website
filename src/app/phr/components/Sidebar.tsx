'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/phr', label: 'Overview', exact: true },
    { href: '/phr/vaccines', label: 'Vaccines' },
    { href: '/phr/visits', label: 'Visits' },
    { href: '/phr/labs-table', label: 'Labs (Table)' },
    { href: '/phr/labs-friendly', label: 'Labs (Tiles)' },
  ]

  return (
    <div className="d-flex flex-column p-3 bg-body-tertiary" style={{ width: '280px', minHeight: '100vh' }}>
      <ul className="nav nav-pills flex-column mb-auto">
        {links.map((link) => (
          <li key={link.href} className="nav-item">
            <Link
              href={link.href}
              className={`nav-link ${
                link.exact ? pathname === link.href : pathname?.startsWith(link.href) ? 'active' : ''
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
