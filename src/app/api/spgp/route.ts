import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

import { colKeys, ParsedSPGP, SPGPSchema } from '@/app/spgp/SPGPSchema'
import db from '@/lib/db'
import { getSession } from '@/lib/session'
import { z } from 'zod'
import GetSPGPPassTypes from '@/app/spgp/GetSPGPPassTypes'
import { sessionSchema, sessionType } from '@/lib/sessionSchema'

async function checkGK(session: sessionType | null) {
  if (session?.ax_spgp != true) {
    return NextResponse.json({ error: 'unauthorized', uid: session?.uid }, { status: 403 })
  }
  return null
}

export async function GET(req: NextRequest) {
  const session = (await getSession())!
  const gkResult = await checkGK(session)
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
    const isAdmin = session.uid == 1 // TODO make this better
    const requests = isAdmin
      ? await db.query(
          `select r_id,
                uid,
                r_first,
                r_last,
                r_email,
                r_birthdate,
                r_previous_passid,
                r_comment,
                r_total,
                r_redeemedMonth,
                r_used_on,
                display_name as passtype_display_name,
                pc.rdmp_code as r_promo
         from spgp_requests
                  left join spgp_passtypes sp on spgp_requests.passtype_id = sp.passtype_id
                  left join spgp_promocodes pc on spgp_requests.r_id = pc.assignee_r_id
         where deleted = 0`,
        )
      : await db.query(
          `select r_id,
                  uid,
                  r_first,
                  r_last,
                  r_email,
                  r_birthdate,
                  r_previous_passid,
                  r_comment,
                  r_total,
                  r_redeemedMonth,
                  r_used_on,
                  display_name as passtype_display_name,
                  pc.rdmp_code as r_promo
           from spgp_requests
                    left join spgp_passtypes sp on spgp_requests.passtype_id = sp.passtype_id
                    left join spgp_promocodes pc on spgp_requests.r_id = pc.assignee_r_id
           where uid = ?
             and deleted = 0`,
          [session.uid],
        )
    const codes = isAdmin
      ? await db.query(`select *
                        from spgp_promocodes`)
      : await db.query(
          `select *
         from spgp_promocodes
         where assignee_r_id in (select r_id from spgp_requests where uid = ? and deleted=0)`,
          [session.uid],
        )
    return NextResponse.json({ passTypes, requests, codes })
  } finally {
    await db.end()
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  const gkResult = await checkGK(session)
  if (gkResult != null) {
    return gkResult
  }

  const json: any = await req.json()
  try {
    if (json.action === 'import-codes') {
      await importCodes(json)
    } else if (json.action === 'spgp-import') {
      await importData(json)
    } else if (json.action === 'mark-used') {
      if (session?.uid == 1) {
        await db.query('update spgp_requests set r_used_on = NOW() where r_id = ?', [z.number().parse(json.id)])
        return NextResponse.json({ ok: true, admin: true })
      } else {
        await db.query('update spgp_requests set r_used_on = NOW() where r_id = ? and uid = ?', [
          z.number().parse(json.id),
          session?.uid ?? -1,
        ])
      }
    } else if (json.action === 'un-mark-used') {
      if (session?.uid == 1) {
        await db.query('update spgp_requests set r_used_on = null where r_id = ?', [z.number().parse(json.id)])
        return NextResponse.json({ ok: true, admin: true })
      } else {
        await db.query('update spgp_requests set r_used_on = null where r_id = ? and uid = ?', [
          z.number().parse(json.id),
          session?.uid ?? -1,
        ])
      }
    } else if (json.action === 'withdraw') {
      if (session?.uid == 1) {
        await db.query('update spgp_requests set deleted = 1 where r_id = ?', [z.number().parse(json.id)])
        return NextResponse.json({ ok: true, admin: true })
      } else {
        await db.query('update spgp_requests set deleted = 1 where r_id = ? and uid = ?', [
          z.number().parse(json.id),
          session?.uid ?? -1,
        ])
      }
    } else {
      // try to add request
      await newRequest(json, session!)
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
  const dbRows: string[][] = sanitizedData.promoCodes.map((code) => [sanitizedData.passTypeID, code])
  await db.query(
    `insert ignore into spgp_promocodes (passtype_id, rdmp_code)
     values ?`,
    [dbRows],
  )
  await assignCodes()
}

async function assignCodes() {
  // this has a race condition, make it better later. it's probably ok for now.
  const availableCodes: { passtype_id: string; id: string }[] = await db.query(`
      select passtype_id, id
      from spgp_promocodes
      where assignee_r_id is null`)
  const neededRequests: { passtype_id: string; r_id: string }[] = await db.query(`
        select spgp_requests.passtype_id, r_id
        from spgp_requests
                 left join spgp_promocodes on r_id = assignee_r_id
        where spgp_promocodes.id is null`)
  console.info('Need ' + neededRequests.length + ' codes')
  for (const request of neededRequests) {
    const code = availableCodes.find((value, index, arr) => {
      if (value.passtype_id === request.passtype_id) {
        // removes the value from the original array
        arr.splice(index, 1)
        return true
      }
      return false
    })
    if (code) {
      console.info('Request ' + request.r_id + ' match code ' + code.id)
      await db.query(`update spgp_promocodes set assignee_r_id = ? where id = ?`, [request.r_id, code.id])
    }
  }
}

async function importData(json: any) {
  const postSchema = z.object({
    data: z.array(SPGPSchema),
  })
  const sanitizedData: ParsedSPGP[] = postSchema.parse(json).data
  const allEmails = new Set<string>(sanitizedData.map((r) => r.email?.toLowerCase() ?? '').filter(Boolean))

  // email to UID
  const emailToUserID = await ensureUsers(Array.from(allEmails))

  // pass type string to ID (caution! allows expired pass types!)
  const passTypeStringToID = new Map<string, number>()
  const passTypeDbRows: any[] = await db.query(
    `select passtype_id, display_name
     from spgp_passtypes`,
  )
  for (let passType of passTypeDbRows) {
    passTypeStringToID.set(passType.display_name, passType.passtype_id)
  }

  const missingPassTypeRows = sanitizedData.filter((r) => r.passType === undefined || !passTypeStringToID.has(r.passType))
  if (missingPassTypeRows.length) {
    throw new Error('Missing pass type')
  }

  // ensure request objects are inserted
  await db.query(
    `insert into spgp_requests (uid, r_email, r_first, r_last, r_birthdate, passtype_id, r_comment, r_redeemedMonth, r_total)
     values ?
     on duplicate key
       update r_comment       = VALUES(r_comment),
              r_redeemedMonth = VALUES(r_redeemedMonth),
              r_total         = VALUES(r_total),
              r_birthdate = VALUES(r_birthdate)`,
    [
      sanitizedData.map((r) => [
        emailToUserID.get(r.email!),
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

  // get request objects
  const rIDs = new Map<string, number>()
  const requests: any[] = await db.query(
    `select r_id, concat(r_email, r_first, r_last) c1
     from spgp_requests`,
  )
  requests.forEach((row) => rIDs.set(row.c1, row.r_id))

  // insert promo codes
  const promoCodesForInsert = sanitizedData
    .filter((r) => !!r.promoCode)
    .map((row) => [passTypeStringToID.get(row.passType!), rIDs.get(row.email! + row.first + row.last), row.promoCode])
  await db.query(
    `insert into spgp_promocodes (passtype_id, assignee_r_id, rdmp_code)
     values ?
     on duplicate key update assignee_r_id = VALUES(assignee_r_id),
                             passtype_id   = VALUES(passtype_id)`,
    [promoCodesForInsert],
  )

  await db.end()
}

async function newRequest(json: any, session: sessionType) {
  const parsed = SPGPSchema.parse(json)
  const uid = session?.uid
  if (!uid || !session?.ax_spgp) {
    throw new Error('missing uid or spgp permissions')
  }
  const passTypes = await GetSPGPPassTypes()
  const pt = passTypes.filter(
    (pt) => pt.passtype_id.toString() === parsed.passType || pt.display_name == parsed.passType,
  )[0]
  if (!pt) {
    throw new Error('Invalid pass type: ' + parsed.passType)
  }

  await db.query(
    `
        insert into spgp_requests (uid, r_first, r_last, r_email, r_birthdate, r_previous_passid, passtype_id)
        values (?, ?, ?, ?, ?, ?, ?)
        on duplicate key update deleted = 0,
                                r_previous_passid = VALUES(r_previous_passid),
                                r_used_on = null`,
    [uid, parsed.first, parsed.last, parsed.email, parsed.birthday, parsed.notes, pt.passtype_id],
  )

  // After creating the request, assign if needed
  try {
    await assignCodes()
  } catch {}
}

// ensures that users exist for all the given emails and returns a map
// of the user email to the UID
async function ensureUsers(emails: string[]): Promise<Map<string, number>> {
  await db.query(
    `insert ignore into users (email)
     values ?`,
    [emails.map((e) => [e])],
  )
  await db.query(
    `update users
     set ax_spgp = 1
     where email in ?`,
    [[emails]],
  )
  const result = new Map<string, number>()
  const dbr: any[] = await db.query(
    `select uid, email
     from users
     where email in ?`,
    [[emails]],
  )
  for (let row of dbr) {
    result.set(z.string().email().parse(row.email), z.number().parse(row.uid))
  }
  return result
}
