import { NextRequest, NextResponse } from 'next/server'
import { convertToTaxHierarchy, graduatedTaxSchema, tax_row } from '@/app/api/tax-brackets/schema'
import { db } from '@/server_lib/db'
import { z } from 'zod'
import { getSession } from '@/server_lib/session'
import _ from 'lodash'

export async function GET(request: NextRequest) {
  // Handle GET request to fetch data from the database.
  try {
    const rows = await db.selectFrom('graduated_tax').selectAll().execute()
    return NextResponse.json(convertToTaxHierarchy(rows))
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
  }
}

export async function POST(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const data = z.array(graduatedTaxSchema).parse(await request.json())
    await db
      .replaceInto('graduated_tax')
      .values(
        data.map((r) => ({
          year: r.year,
          region: r.region ?? '',
          income_over: r.income_over,
          rate: r.rate,
          type: r.type,
        })),
      )
      .execute()
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
  }
}
