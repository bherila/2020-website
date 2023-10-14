import 'server-only'
import mysql from '@/lib/db'
import { EV } from '@/app/ev-database/ev-models'

export async function loadEV(): Promise<EV[]> {
  const query = await mysql.query('select * from ev_database')
  await mysql.end()
  return query as EV[]
}
