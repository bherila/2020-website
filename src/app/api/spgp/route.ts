import 'server-only'
import { NextRequest, NextResponse } from 'next/server'

import { ParsedSPGP, SPGPSchema } from '@/app/spgp/SPGPSchema'
import { db } from '@/server_lib/db'
import { getSession } from '@/server_lib/session'
import { z } from 'zod'
import GetSPGPPassTypes from '@/app/spgp/GetSPGPPassTypes'
import { sessionType } from '@/lib/sessionSchema'
import { sql } from 'kysely'

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
  const isAdmin = session.uid == 1 // TODO make this better
  const requests = await db
    .selectFrom('spgp_requests')
    .leftJoin('spgp_passtypes', 'spgp_requests.passtype_id', 'spgp_passtypes.passtype_id')
    .leftJoin('spgp_promocodes', 'spgp_requests.r_id', 'spgp_promocodes.assignee_r_id')
    .select([
      'spgp_requests.r_id',
      'spgp_requests.uid',
      'spgp_requests.r_first',
      'spgp_requests.r_last',
      'spgp_requests.r_email',
      'spgp_requests.r_birthdate',
      'spgp_requests.r_previous_passid',
      'spgp_requests.r_comment',
      'spgp_requests.r_total',
      'spgp_requests.r_redeemedMonth',
      'spgp_requests.r_used_on',
      'spgp_passtypes.display_name as passtype_display_name',
      'spgp_promocodes.rdmp_code as r_promo',
    ])
    .where('spgp_requests.deleted', '=', 0)
    .where('spgp_requests.uid', isAdmin ? '>' : '=', isAdmin ? -1 : session.uid)
    .orderBy('spgp_requests.r_id', 'asc')
    .execute()

  const codes = isAdmin
    ? await db.selectFrom('spgp_promocodes').selectAll().execute()
    : await db
        .selectFrom('spgp_promocodes')
        .innerJoin('spgp_requests', 'spgp_promocodes.assignee_r_id', 'spgp_requests.r_id')
        .where('spgp_requests.uid', isAdmin ? '>' : '=', isAdmin ? -1 : session.uid)
        .where('spgp_requests.deleted', '=', 0)
        .selectAll('spgp_promocodes')
        .execute()
  return NextResponse.json({ passTypes, requests, codes })
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  const gkResult = await checkGK(session)
  if (gkResult != null) {
    return gkResult
  }

  const json: any = await req.json()
  if (json.action === 'import-codes') {
    await importCodes(json)
  } else if (json.action === 'spgp-import') {
    await importData(json)
  } else if (json.action === 'mark-used') {
    if (session?.uid == 1) {
      await db
        .updateTable('spgp_requests')
        .set({ r_used_on: sql`NOW()` })
        .where('r_id', '=', z.number().parse(json.id))
        .execute()
      return NextResponse.json({ ok: true, admin: true })
    } else {
      await db
        .updateTable('spgp_requests')
        .set({ r_used_on: sql`NOW()` })
        .where('r_id', '=', z.number().parse(json.id))
        .where('uid', '=', session?.uid ?? -1)
        .execute()
    }
  } else if (json.action === 'un-mark-used') {
    if (session?.uid == 1) {
      await db.updateTable('spgp_requests').set({ r_used_on: null }).where('r_id', '=', z.number().parse(json.id)).execute()
      return NextResponse.json({ ok: true, admin: true })
    } else {
      await db
        .updateTable('spgp_requests')
        .set({ r_used_on: null })
        .where('r_id', '=', z.number().parse(json.id))
        .where('uid', '=', session?.uid ?? -1)
        .execute()
    }
  } else if (json.action === 'withdraw') {
    if (session?.uid == 1) {
      await db.updateTable('spgp_requests').set({ deleted: 1 }).where('r_id', '=', z.number().parse(json.id)).execute()
      return NextResponse.json({ ok: true, admin: true })
    } else {
      await db
        .updateTable('spgp_requests')
        .set({ deleted: 1 })
        .where('r_id', '=', z.number().parse(json.id))
        .where('uid', '=', session?.uid ?? -1)
        .execute()
    }
  } else {
    // try to add request
    await newRequest(json, session!)
  }
  return NextResponse.json({})
}

async function importCodes(json: any) {
  const postSchema = z.object({
    passTypeID: z.number(),
    promoCodes: z.array(z.string()),
  })
  const sanitizedData = postSchema.parse(json)
  const dbRows = sanitizedData.promoCodes.map((code) => ({
    passtype_id: sanitizedData.passTypeID,
    rdmp_code: code,
  }))
  await db.insertInto('spgp_promocodes').ignore().values(dbRows).execute()
  await assignCodes()
}

async function assignCodes() {
  // this has a race condition, make it better later. it's probably ok for now.
  const availableCodes = await db
    .selectFrom('spgp_promocodes')
    .where('assignee_r_id', 'is', null)
    .select(['passtype_id', 'id as id'])
    .execute()

  const neededRequests = await db
    .selectFrom('spgp_requests')
    .leftJoin('spgp_promocodes', 'spgp_requests.r_id', 'spgp_promocodes.assignee_r_id')
    .where('spgp_promocodes.id', 'is', null)
    .select(['spgp_requests.passtype_id', 'spgp_requests.r_id'])
    .execute()

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
      await db.updateTable('spgp_promocodes').set({ assignee_r_id: request.r_id }).where('id', '=', code.id).execute()
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
  const passTypeDbRows = await db.selectFrom('spgp_passtypes').select(['passtype_id', 'display_name']).execute()
  for (let passType of passTypeDbRows) {
    passTypeStringToID.set(passType.display_name ?? '', passType.passtype_id)
  }

  const missingPassTypeRows = sanitizedData.filter((r) => r.passType === undefined || !passTypeStringToID.has(r.passType))
  if (missingPassTypeRows.length) {
    throw new Error('Missing pass type')
  }

  // ensure request objects are inserted
  await db
    .insertInto('spgp_requests')
    .values(
      sanitizedData.map((r) => ({
        uid: emailToUserID.get(r.email!) ?? null,
        r_email: r.email ?? '',
        r_first: r.first ?? '',
        r_last: r.last ?? '',
        r_birthdate: r.birthday ?? null,
        passtype_id: passTypeStringToID.get(r.passType!) ?? null,
        r_comment: r.notes ?? null,
        r_redeemedMonth: r.redeemedMonth ?? null,
        r_total: r.total ?? null,
      })),
    )
    .onDuplicateKeyUpdate({
      r_comment: sql`VALUES(r_comment)`,
      r_redeemedMonth: sql`VALUES(r_redeemedMonth)`,
      r_total: sql`VALUES(r_total)`,
      r_birthdate: sql`VALUES(r_birthdate)`,
    })
    .execute()

  // get request objects
  const rIDs = new Map<string, number>()
  const requests = await db
    .selectFrom('spgp_requests')
    .select(['r_id', sql`CONCAT(r_email, r_first, r_last)`.as('c1')])
    .execute()

  requests.forEach((row) => rIDs.set(row.c1 as string, row.r_id))

  // insert promo codes
  const promoCodesForInsert = sanitizedData
    .filter((r) => !!r.promoCode)
    .map((row) => ({
      passtype_id: passTypeStringToID.get(row.passType!) ?? -1,
      assignee_r_id: rIDs.get(row.email! + row.first + row.last) ?? -1,
      rdmp_code: row.promoCode ?? '',
    }))

  await db
    .insertInto('spgp_promocodes')
    .values(promoCodesForInsert)
    .onDuplicateKeyUpdate({
      assignee_r_id: sql`VALUES(assignee_r_id)`,
      passtype_id: sql`VALUES(passtype_id)`,
    })
    .execute()
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

  await db
    .insertInto('spgp_requests')
    .values({
      uid: uid,
      r_first: parsed.first,
      r_last: parsed.last,
      r_email: parsed.email ?? '',
      r_birthdate: parsed.birthday,
      r_previous_passid: parsed.notes,
      passtype_id: pt.passtype_id,
    })
    .onDuplicateKeyUpdate({
      deleted: 0,
      r_previous_passid: sql`VALUES(r_previous_passid)`,
      r_used_on: null,
    })
    .execute()

  // After creating the request, assign if needed
  try {
    await assignCodes()
  } catch {}
}

// ensures that users exist for all the given emails and returns a map
// of the user email to the UID
async function ensureUsers(emails: string[]): Promise<Map<string, number>> {
  await db
    .insertInto('users')
    .values(emails.map((e) => ({ email: e })))
    .ignore() // on conflict do nothing
    .execute()

  await db.updateTable('users').set({ ax_spgp: 1 }).where('email', 'in', emails).execute()

  const result = new Map<string, number>()
  const dbr = await db.selectFrom('users').select(['uid', 'email']).where('email', 'in', emails).execute()

  for (const row of dbr) {
    result.set(z.string().email().parse(row.email), z.number().parse(row.uid))
  }

  return result
}
