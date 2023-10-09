'use server'
import 'server-only'
import db from '@/lib/db'
import {
  SPGPPassTypesSchema,
  ParsedSPGPPassType,
} from '@/app/spgp/SPGPPassTypes'

export default async function GetSPGPPassTypes(): Promise<
  ParsedSPGPPassType[]
> {
  const types = (await db.query(
    'select passtype_id, display_name, expiry, info from spgp_passtypes where expiry > now()',
  )) as any[]
  await db.end()

  return types.map((t) => SPGPPassTypesSchema.parse(t))
}
