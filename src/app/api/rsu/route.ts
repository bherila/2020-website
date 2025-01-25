import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/server_lib/prisma'
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
        award_id: z.coerce.string(),
        grant_date: z.coerce.string(),
        vest_date: z.coerce.string(),
        share_count: z.coerce.number(),
        symbol: z.coerce.string(),
      }),
    )
    const data = schema.parse(await req.json())
    await prisma.finEquityAwards.createMany({
      data: data.map((row) => ({
        ...row,
        uid,
      })),
    })
    return NextResponse.json(await getRows(uid))
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.message, { status: 400 })
    }
    return NextResponse.json(e, { status: 400 })
  }
}

async function getRows(uid: string) {
  return await prisma.finEquityAwards.findMany({
    where: { uid },
    orderBy: [{ vest_date: 'asc' }, { grant_date: 'asc' }],
  })
}

export async function GET(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }
  return NextResponse.json(await getRows(uid))
}
