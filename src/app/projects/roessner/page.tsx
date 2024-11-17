import React from 'react'
import Container from '@/components/container'
import Typography from '@/components/typography'
import Link from '@/components/link'

export default function Page() {
  return (
    <Container>
      <Typography variant="h1">Roessner &amp; Co.</Typography>
      <Typography variant="body1" py={1}>
        I built the website for Roessner &amp; Co. and also served as in-house software developer for their contract
        projects.
      </Typography>
    </Container>
  )
}
