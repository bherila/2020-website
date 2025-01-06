import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server_lib/db'
import { getSession } from '@/server_lib/session'
import { z, ZodError } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json('Unauthorized', { status: 403 })
    }
    const schema = z.array(
      z.object({
        award_id: z.coerce.number(),
        grant_date: z.coerce.string(),
        vest_date: z.coerce.string(),
        share_count: z.coerce.number(),
        symbol: z.coerce.string(),
      }),
    )
    const data = schema.parse(await req.json())

    await db
      .insertInto('fin_equity_awards')
      .values(
        data.map((r) => ({
          uid,
          award_id: r.award_id,
          grant_date: r.grant_date,
          vest_date: r.vest_date,
          share_count: r.share_count,
          symbol: r.symbol,
        })),
      )
      .execute()

    return NextResponse.json(await getRows(uid))
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.message, { status: 400 })
    }
    return NextResponse.json(e, { status: 400 })
  }
}

async function getRows(uid: number) {
  return await db
    .selectFrom('fin_equity_awards')
    .selectAll()
    .where('uid', '=', uid)
    .orderBy('vest_date')
    .orderBy('grant_date')
    .execute()
}

export async function GET(req: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json('Unauthorized', { status: 403 })
    }
    return NextResponse.json(await getRows(uid))
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }
}
