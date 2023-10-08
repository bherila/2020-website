import Container from '@/components/container'
import { getSession } from '@/lib/session'
import React from 'react'
import MainTitle from '@/components/main-title'

export default async function SPGPInfo() {
  const session = await getSession()
  if (!session?.ax_spgp) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don't have access to this application.</h2>
      </Container>
    )
  }
  return (
    <Container>
      <h1>Ski pass group purchase</h1>
      <p>
        Please keep in mind this offer is to be kept in private communication,
        no public websites, and social media spaces. This offer is only valid
        for individuals associated with your group. Please communicate this
        privacy clause to all individuals you provide the offer to.
      </p>
    </Container>
  )
}
