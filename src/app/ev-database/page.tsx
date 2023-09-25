import mysql from '@/lib/db'
import EvDatabaseClient from '@/app/ev-database/EvDatabaseClient'
import React from 'react'
import { Metadata } from 'next'
import Typography from "@/components/typography";

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
          <Typography variant="h1">The EV database</Typography>
          <Typography variant="body1">
            Inspired by a Reddit thread, I productionized the canonical EV
            database spreadsheet into a real database, enabling some new use cases
            including a JSON API, and more.
          </Typography>
          <EvDatabaseClient json={json} />
        </>
  )
}
