import { Container } from '@mui/material'
import React from 'react'

import Header from '../components/header'

export const Home = (): JSX.Element => (
  <>
    <Container maxWidth="sm">
      <h1>Not found</h1>
      <p>The page you requested was not found.</p>
    </Container>
  </>
)

export default Home
