import { Container } from '@mui/material'
import React from 'react'

import Header from '../components/header'

export const Home = (): JSX.Element => (
  <>
    <Header />
    <Container maxWidth="sm">
      <h2>Human Centric Design &amp;&nbsp;Development</h2>
      <p className="paragraph-2">
        Do you need a website or end-to-end technology solution?
      </p>
      <a
        href="mailto:ben@herila.net?subject=Website%20Contact"
        className="cta w-button"
      >
        Get in touch
      </a>
    </Container>
  </>
)

export default Home
