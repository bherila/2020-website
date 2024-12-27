'use client'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { type sessionType } from '@/lib/sessionSchema'

interface HeaderProps {
  session: sessionType
}

export default function Header({ session }: HeaderProps) {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" as={Nav} aria-label="primary navigation">
      <Container>
        <Link href="/" aria-label="Ben Herila" className="navbar-brand">
          Ben Herila
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="toggle navigation" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/recipes" className="nav-link">
              Recipes
            </Link>
            <Link href="/projects" className="nav-link">
              Projects
            </Link>
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/maxmin/MSFT">MaxMin 🔑</NavDropdown.Item>
              <NavDropdown.Item href="/keys/">License Manager 🔑</NavDropdown.Item>
              <NavDropdown.Item href="/rsu/">Finance - RSU 🔑</NavDropdown.Item>
              <NavDropdown.Item href="/payslip/">Finance - Payslips 🔑</NavDropdown.Item>
              {session?.ax_spgp && <NavDropdown.Item href="/spgp">Ski Pass Group Purchase 🔑</NavDropdown.Item>}
              {session?.ax_phr && <NavDropdown.Item href="/phr">PHR 🔑</NavDropdown.Item>}
              {/*<NavDropdown.Divider />*/}
              <NavDropdown.Item href="/finance/">Accounts</NavDropdown.Item>
              <NavDropdown.Item href="/bingo/">Bingo card generator</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <ThemeToggle />
            {!session?.uid ? (
              <>
                <Link href="/auth/sign-in" aria-label="Sign in" className="nav-link">
                  Sign in
                </Link>
                <Link href="/auth/sign-up" aria-label="Sign up" className="nav-link">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link href="/my-account" aria-label="My Account" className="nav-link">
                  My Account
                </Link>
                <Link href="/api/sign-out" aria-label="Sign out" className="nav-link">
                  Sign out
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
