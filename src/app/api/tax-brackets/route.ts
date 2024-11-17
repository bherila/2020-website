import { NextRequest, NextResponse } from 'next/server'
import { convertToTaxHierarchy, graduatedTaxSchema, tax_row } from '@/app/api/tax-brackets/schema'
import db from '@/lib/db'
import { z } from 'zod'
import { getSession } from '@/lib/session'
import _ from 'lodash'

export async function GET(request: NextRequest) {
  // Handle GET request to fetch data from the database.
  try {
    const rows: tax_row[] = await db.query('SELECT year, region, income_over, rate, type FROM graduated_tax')
    return NextResponse.json(convertToTaxHierarchy(rows))
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}

export async function POST(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const data = z.array(graduatedTaxSchema).parse(await request.json())
    const params = data.map((r) => {
      return [r.year, r.region, r.income_over, r.rate, r.type]
    })
    const query = 'REPLACE INTO graduated_tax (year, region, income_over, rate, type) VALUES ?'
    await db.query(query, [params])
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  } finally {
    await db.end()
  }
}
