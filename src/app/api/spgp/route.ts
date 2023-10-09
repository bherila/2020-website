import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

import { colKeys, SPGPSchema } from '@/app/spgp/SPGPSchema'
import db from '@/lib/db'
import { getSession } from '@/lib/session'
import { z } from 'zod'

/*promoCode
renewOrNew
first
last
birthday
email
passType
price
redeemedMonth
total
notes
sentCode*/
async function getGroupManifest() {
  const dbRows = await db.query(`
  select * from spgp_requests`)
}

async function checkGK() {
  const session = await getSession()
  if (session?.ax_spgp != true) {
    return NextResponse.json(
      { error: 'unauthorized', uid: session?.uid },
      { status: 403 },
    )
  }
  return null
}

export async function GET(req: NextRequest) {
  const gkResult = await checkGK()
  if (gkResult != null) {
    return gkResult
  }

  return NextResponse.json({})
}

export async function POST(req: NextRequest) {
  const gkResult = await checkGK()
  if (gkResult != null) {
    return gkResult
  }

  const json: any = await req.json()
  if (json.action === 'import-codes') {
    const postSchema = z.object({
      passTypeID: z.string(),
      promoCodes: z.array(z.string()),
    })
    const sanitizedData = postSchema.parse(json)
    const dbRows: string[][] = sanitizedData.promoCodes.map((code) => [
      sanitizedData.passTypeID,
      code,
    ])
    await db.query(
      `insert ignore into spgp_promocodes (passtype_id, rdmp_code) values ?`,
      [dbRows],
    )
  }
  return NextResponse.json({})
}
