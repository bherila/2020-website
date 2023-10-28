import Container from '@/components/container'
import { getSession } from '@/lib/session'
import React from 'react'
import MainTitle from '@/components/main-title'
import SPGPClient from '@/app/spgp/SPGPClient'

export default async function SPGPInfo() {
  const session = await getSession()
  if (!session?.ax_spgp) {
    return (
      <Container>
        <MainTitle>Access denied</MainTitle>
        <h2>You don&apos;t have access to this application.</h2>
      </Container>
    )
  }
  return (
    <Container>
      <SPGPClient
        admin={session?.uid == 1 /*  // TODO make this better */}
        userEmail={session?.email ?? ''}
      />
    </Container>
  )
}
