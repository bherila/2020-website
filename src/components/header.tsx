'use client'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Ben Herila</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/projects">Projects</Nav.Link>
            <NavDropdown title="Tools" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/maxmin/MSFT">MaxMin</NavDropdown.Item>
              {/*<NavDropdown.Divider />*/}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/auth/sign-in">Sign in</Nav.Link>
            <Nav.Link href="/auth/sign-up">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}