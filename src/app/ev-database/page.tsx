import mysql from '@/lib/db'
import EvDatabaseClient from '@/app/ev-database/EvDatabaseClient'
import React from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Metadata } from 'next'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'

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
    <Grid container>
      <Grid item xs={12} md={3}>
        <Typography variant="h1">The EV database</Typography>
        <Typography variant="body1">
          Inspired by a Reddit thread, I productionized the canonical EV
          database spreadsheet into a real database, enabling some new use cases
          including a JSON API, and more.
        </Typography>
      </Grid>
      <Grid item xs={12} md={9}>
        <EvDatabaseClient json={json} />
      </Grid>
    </Grid>
  )
}
