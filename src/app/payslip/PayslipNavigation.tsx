'use client'
import { Nav } from 'react-bootstrap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PayslipNavigation() {
  const pathname = usePathname()

  return (
    <Nav variant="tabs" className="mb-3 container-fluid mt-4 justify-content-center">
      <Nav.Item>
        <Nav.Link
          as={Link}
          href="/payslip"
          active={
            pathname.startsWith('/payslip') &&
            !pathname.startsWith('/payslip/import') &&
            !pathname.startsWith('/payslip/config')
          }
        >
          List
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/payslip/import/pdf" active={pathname.startsWith('/payslip/import/pdf')}>
          Import PDF
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/payslip/import/json" active={pathname.startsWith('/payslip/import/json')}>
          Import JSON
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/payslip/config" active={pathname.startsWith('/payslip/config')}>
          Configuration
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
