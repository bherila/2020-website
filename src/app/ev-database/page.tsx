import 'server-only'
import mysql from '@/lib/db'
import EvDatabaseClient from '@/app/ev-database/EvDatabaseClient'
import React from 'react'
import { Metadata } from 'next'
import Typography from '@/components/typography'
import Container from "@/components/container";
import MainTitle from "@/components/main-title";

export const metadata: Metadata = {
  title: 'The EV database',
}

export default async function EVDatabasePage() {
  const query = await mysql.query(
    'select * from `EV Release Database - EV List`',
  )
  await mysql.end()
  const json = JSON.stringify(query)
  return (
    <>
      <Container>
        <MainTitle>The EV database</MainTitle>
        <Typography>
          Inspired by a Reddit thread, I productionized the canonical EV database
          spreadsheet into a real database, enabling some new use cases including
          a JSON API, and more.
        </Typography>
      </Container>
      <EvDatabaseClient json={json} />
    </>
  )
}
