import EvDatabaseClient from '@/app/ev-database/EvDatabaseClient'
import React from 'react'
import { Metadata } from 'next'
import Typography from '@/components/typography'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'
import { loadEV } from '@/app/ev-database/ev-database-server'

export const metadata: Metadata = {
  title: 'The EV database',
}

export default async function EVDatabasePage() {
  const json = JSON.stringify(await loadEV())
  return (
    <>
      <Container>
        <MainTitle>The EV database</MainTitle>
        <Typography>
          Inspired by a{' '}
          <a href="https://www.reddit.com/r/electricvehicles/comments/usrk5e/crowdsourced_ev_database/">
            Reddit thread
          </a>
          , I productionized the canonical{' '}
          <a
            href={
              'https://docs.google.com/spreadsheets/d/1in2HoppoZxOHcHS1Hu6liMG1MpwxJOr7bO4KumA8sQ4/'
            }
          >
            EV database spreadsheet
          </a>{' '}
          into a real database, enabling some new use cases including a JSON
          API, and more. For US federal tax credits, see{' '}
          <a href={'https://fueleconomy.gov/feg/tax2023.shtml'}>
            the official database
          </a>{' '}
          of them.
        </Typography>
      </Container>
      <EvDatabaseClient json={json} />
    </>
  )
}
