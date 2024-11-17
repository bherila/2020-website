'use client'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { sessionType } from '@/lib/sessionSchema'
import useSWR from 'swr'

export default function Header(props: {}) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: session, error, isLoading } = useSWR<sessionType>('/api/session/', fetcher)
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" as={Nav} aria-label="primary navigation">
      <Container>
        <Navbar.Brand href="/" aria-label="Ben Herila">
          Ben Herila
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="toggle navigation" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/maxmin/MSFT">MaxMin</NavDropdown.Item>
              <NavDropdown.Item href="/cdkeys/">CD Keys Manager 🔑</NavDropdown.Item>
              <NavDropdown.Item href="/rsu/">Finance - RSU 🔑</NavDropdown.Item>
              <NavDropdown.Item href="/payslip/">Finance - Payslips 🔑</NavDropdown.Item>
              {session?.ax_spgp && <NavDropdown.Item href="/spgp">Ski Pass Group Purchase 🔑</NavDropdown.Item>}
              {/*<NavDropdown.Divider />*/}
              <NavDropdown.Item href="/accounts/">Accounts</NavDropdown.Item>
              <NavDropdown.Item href="/bingo/">Bingo card generator</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {!isLoading && (
            <Nav>
              {!session?.uid ? (
                <>
                  <Nav.Link href="/auth/sign-in" aria-label="Sign in">
                    Sign in
                  </Nav.Link>
                  <Nav.Link href="/auth/sign-up" aria-label="Sign up">
                    Sign up
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link href="/api/sign-out" aria-label="Sign out">
                  Sign out
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
