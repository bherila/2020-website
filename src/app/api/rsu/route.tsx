import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { getSession } from '@/lib/session'
import { z, ZodError } from 'zod'
import { compareAsc, format } from 'date-fns'

export async function POST(req: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json('Unauthorized', { status: 403 })
    }
    const schema = z.array(
      z.object({
        award_id: z.coerce.string(),
        grant_date: z.coerce.string(),
        vest_date: z.coerce.string(),
        share_count: z.coerce.number(),
        symbol: z.coerce.string(),
      }),
    )
    const data = schema
      .parse(await req.json())
      .map((r) => [
        uid,
        r.award_id,
        r.grant_date,
        r.vest_date,
        r.share_count,
        r.symbol,
      ])
    await db.query(
      'insert into fin_equity_awards (uid, award_id, grant_date, vest_date, share_count, symbol) values ?',
      [data],
    )
    return NextResponse.json(await getRows(uid))
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.message, { status: 400 })
    }
    return NextResponse.json(e, { status: 400 })
  } finally {
    await db.end()
  }
}

async function getRows(uid: number) {
  return await db.query(
    `select id,
            award_id,
            cast(grant_date as char) as grant_date,
            cast(vest_date as char) as vest_date,
            share_count,
            symbol,
            uid
     from fin_equity_awards
     where uid = ?
     order by vest_date, grant_date`,
    [uid],
  )
}

export async function GET(req: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json('Unauthorized', { status: 403 })
    }
    return NextResponse.json(await getRows(uid))
  } finally {
    await db.end()
  }
}
