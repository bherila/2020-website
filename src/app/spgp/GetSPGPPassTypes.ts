'use server'
import 'server-only'
import { db } from '@/server_lib/db'
import { SPGPPassTypesSchema, ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { getSession } from '@/server_lib/session'
import { sql } from 'kysely'

export default async function GetSPGPPassTypes(): Promise<ParsedSPGPPassType[]> {
  const session = await getSession()
  let query = db.selectFrom('spgp_passtypes').select([
    'passtype_id',
    'display_name',
    'expiry', // sql`CAST(expiry as char) as expiry`.as('expiry'),
    'info',
  ])

  if (session?.uid !== 1) {
    query = query.where('expiry', '>', sql<any>`NOW()`)
  }

  const types = await query.execute()
  return types.map((t) => SPGPPassTypesSchema.parse(t))
}
