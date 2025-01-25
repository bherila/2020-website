import { NextRequest, NextResponse } from 'next/server'
import { convertToTaxHierarchy, graduatedTaxSchema, tax_row } from '@/app/api/tax-brackets/schema'
import { prisma } from '@/server_lib/prisma'
import { z } from 'zod'
import { getSession } from '@/server_lib/session'
import _ from 'lodash'

export async function GET(request: NextRequest) {
  try {
    const rows = (await prisma.graduatedTax.findMany()).map((row): tax_row => {
      return {
        year: Number(row.year),
        region: row.region.toString(),
        income_over: row.income_over,
        rate: row.rate.toNumber(),
        type: row.type.toString(),
      }
    })
    return NextResponse.json(convertToTaxHierarchy(rows as tax_row[]))
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const data = z.array(graduatedTaxSchema).parse(await request.json())

    await prisma.$transaction(
      data.map((row) =>
        prisma.graduatedTax.upsert({
          where: {
            year_region_income_over_type: {
              year: row.year,
              region: row.region!,
              income_over: row.income_over,
              type: row.type!,
            },
          },
          update: {
            year: row.year,
            region: row.region!,
            income_over: row.income_over,
            type: row.type!,
            rate: row.rate,
          },
          create: {
            year: row.year,
            region: row.region!,
            income_over: row.income_over,
            type: row.type!,
            rate: row.rate,
          },
        }),
      ),
    )

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: e?.toString() }, { status: 400 })
  }
}
