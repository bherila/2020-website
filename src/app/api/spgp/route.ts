import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

import { colKeys, ParsedSPGP, SPGPSchema } from '@/app/spgp/SPGPSchema'
import db from '@/lib/db'
import { getSession } from '@/lib/session'
import { z } from 'zod'
import GetSPGPPassTypes from '@/app/spgp/GetSPGPPassTypes'

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

  const passTypes = await GetSPGPPassTypes()
  if (req.nextUrl.searchParams.get('only') === 'passTypes') {
    // early exit with just the passTypes
    return NextResponse.json({ passTypes })
  }

  // get...everything
  try {
    const session = (await getSession())!
    const isAdmin = session.uid == 1
    const requests = isAdmin
      ? await db.query(`select * from spgp_requests`)
      : await db.query(`select * from spgp_requests where uid = ?`, [
          session.uid,
        ])
    const codes = isAdmin
      ? await db.query(`select * from spgp_promocodes`)
      : await db.query(
          `select * from spgp_promocodes where assignee_r_id in (select r_id from spgp_requests where uid = ?)`,
          [session.uid],
        )
    return NextResponse.json({ passTypes, requests, codes })
  } finally {
    await db.end()
  }
}

export async function POST(req: NextRequest) {
  const gkResult = await checkGK()
  if (gkResult != null) {
    return gkResult
  }

  const json: any = await req.json()
  try {
    if (json.action === 'import-codes') {
      await importCodes(json)
    } else if (json.action === 'spgp-import') {
      await importData(json)
    }
  } finally {
    await db.end()
  }
  return NextResponse.json({})
}

async function importCodes(json: any) {
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

async function importData(json: any) {
  const postSchema = z.object({
    data: z.array(SPGPSchema),
  })
  const sanitizedData: ParsedSPGP[] = postSchema.parse(json).data
  const allEmails = new Set<string>(
    sanitizedData.map((r) => r.email?.toLowerCase() ?? '').filter(Boolean),
  )

  // email to UID
  const emailToUserID = await ensureUsers(Array.from(allEmails))

  // pass type string to ID (caution! allows expired pass types!)
  const passTypeStringToID = new Map<string, number>()
  const passTypeDbRows: any[] = await db.query(
    `select passtype_id, display_name from spgp_passtypes`,
  )
  for (let passType of passTypeDbRows) {
    passTypeStringToID.set(passType.display_name, passType.passtype_id)
  }

  const missingPassTypeRows = sanitizedData.filter(
    (r) => r.passType === undefined || !passTypeStringToID.has(r.passType),
  )
  if (missingPassTypeRows.length) {
    throw new Error('Missing pass type')
  }

  // ensure request objects are inserted
  await db.query(
    `insert into spgp_requests (r_email, r_first, r_last, r_birthdate, passtype_id, r_comment, r_redeemedMonth, r_total) 
    values ? 
    on duplicate key 
    update r_comment = VALUES(r_comment), r_redeemedMonth = VALUES(r_redeemedMonth), r_total = VALUES(r_total)`,
    [
      sanitizedData.map((r) => [
        r.email,
        r.first,
        r.last,
        r.birthday,
        passTypeStringToID.get(r.passType!),
        r.notes,
        r.redeemedMonth,
        r.total,
      ]),
    ],
  )

  // assign users to requests
  await db.query(
    `update spgp_requests inner join users u on email = r_email
     set spgp_requests.uid = u.uid where spgp_requests.uid is null`,
  )

  // get request objects
  const rIDs = new Map<string, number>()
  const requests: any[] = await db.query(
    `select r_id, concat(r_email, r_first, r_last) c1 from spgp_requests`,
  )
  requests.forEach((row) => rIDs.set(row.c1, row.r_id))

  // insert promo codes
  const promoCodesForInsert = sanitizedData.map((row) => [
    passTypeStringToID.get(row.passType!),
    rIDs.get(row.email! + row.first + row.last),
    row.promoCode,
  ])
  await db.query(
    `insert into spgp_promocodes (passtype_id, assignee_r_id, rdmp_code) values ?
on duplicate key update assignee_r_id = VALUES(assignee_r_id), passtype_id = VALUES(passtype_id)`,
    [promoCodesForInsert],
  )

  await db.end()
}

// ensures that users exist for all the given emails and returns a map
// of the user email to the UID
async function ensureUsers(emails: string[]): Promise<Map<string, number>> {
  await db.query(`insert ignore into users (email) values ?`, [
    emails.map((e) => [e]),
  ])
  await db.query(`update users set ax_spgp = 1 where email in ?`, [[emails]])
  const result = new Map<string, number>()
  const dbr: any[] = await db.query(
    `select uid, email from users where email in ?`,
    [[emails]],
  )
  for (let row of dbr) {
    result.set(z.string().email().parse(row.email), z.number().parse(row.uid))
  }
  return result
}
