'use server'
import 'server-only'
import db from '@/lib/db'
import {
  SPGPPassTypesSchema,
  ParsedSPGPPassType,
} from '@/app/spgp/SPGPPassTypes'
import { getSession } from '@/lib/session'

export default async function GetSPGPPassTypes(): Promise<
  ParsedSPGPPassType[]
> {
  const session = await getSession()
  if (session?.uid === 1) {
    const types = (await db.query(
      'select passtype_id, display_name, CAST(expiry as char) as expiry, info from spgp_passtypes',
    )) as any[]
    await db.end()
    return types.map((t) => SPGPPassTypesSchema.parse(t))
  } else {
    const types = (await db.query(
      'select passtype_id, display_name, CAST(expiry as char) as expiry, info from spgp_passtypes where expiry > now()',
    )) as any[]
    await db.end()
    return types.map((t) => SPGPPassTypesSchema.parse(t))
  }
}
