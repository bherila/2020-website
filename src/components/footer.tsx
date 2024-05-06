'use client'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import * as React from 'react'

export default function Footer() {
  return (
    <Navbar
      as="footer"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      style={{ marginTop: '10em' }}
    >
      <Container>
        <Navbar.Text>&copy; 2024 Ben Herila</Navbar.Text>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/legal/accessibility">Accessibility</Nav.Link>
            <Nav.Link href="/legal/privacy">Privacy</Nav.Link>
            <Nav.Link href="/legal/terms">Terms</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
