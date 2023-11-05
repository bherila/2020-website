import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import deepRemoveKey from '@/lib/DeepRemoveKey'
import db from '@/lib/db'
import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { getSession } from '@/lib/session'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }
  let data: any[] = await db.query(
    `
    select
      payslip_id,
      cast(period_start as char) as period_start,
      cast(period_end as char) as period_end,
      cast(pay_date as char) as pay_date,
      ps_401k_aftertax,
      ps_401k_pretax,
      ps_bonus,
      ps_comment,
      ps_fed_tax,
      ps_fed_tax_refunded,
      ps_gross_earnings,
      ps_imputed_income,
      ps_is_estimated,
      ps_medicare,
      ps_oasdi,
      ps_payslip_file_hash,
      ps_pretax_fsa,
      ps_pretax_medical,
      ps_rsu,
      ps_salary,
      ps_state_disability,
      ps_state_tax,
      other
    from fin_payslip where uid = ? order by pay_date`,
    [uid],
  )

  data = data.map((r) => ({
    ...r,
    other: typeof r.other === 'string' ? JSON.parse(r.other) : r.other,
  }))

  return NextResponse.json(z.array(fin_payslip_schema).parse(data))
}

interface fin_payslip_with_uid extends fin_payslip {
  uid: any
}

export async function POST(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const formData = await req.formData()

  const parsedJson = formData.get('parsed_json') as string
  if (parsedJson) {
    const rowsToInsert: fin_payslip[] = z
      .array(fin_payslip_schema)
      .parse(JSON.parse(parsedJson))
    const withUid = rowsToInsert.map(
      (r): fin_payslip_with_uid => ({
        uid,
        ...r,
      }),
    )
    try {
      for (const r of withUid) {
        const { other, ...x } = r
        await db.query(`replace into fin_payslip set ?, other=?`, [
          x,
          JSON.stringify(other),
        ])
      }
    } finally {
      await db.end()
    }
    return NextResponse.json({})
  }

  const pdfFile: any = formData.get('pdf')
  let fileName = ''
  let hash = ''
  if (typeof pdfFile === 'object') {
    fileName = pdfFile.name
    const fileBuffer = Buffer.from(await pdfFile.arrayBuffer())
    hash = createHash('sha1').update(fileBuffer).digest('hex')
  }

  let parseResult: any = {}
  let jsonFile: File | string = formData.get('raw_json') as File
  if (typeof jsonFile === 'object') {
    jsonFile = await (jsonFile as File).text()
  }
  if (!!jsonFile) {
    try {
      parseResult = JSON.parse(jsonFile as string)
      deepRemoveKey(parseResult, 'textAnchor')
      deepRemoveKey(parseResult, 'pageAnchor')
      deepRemoveKey(parseResult, 'layout')
      deepRemoveKey(parseResult, 'blocks')
      deepRemoveKey(parseResult, 'paragraphs')
      deepRemoveKey(parseResult, 'lines')
      deepRemoveKey(parseResult, 'detectedLanguages')
      deepRemoveKey(parseResult, 'pages')
    } catch {
      parseResult = {}
    }
  }

  try {
    await db.query(
      `insert into fin_payslip_uploads (file_name, file_hash, parsed_json) values (?, ?, ?)`,
      [fileName, hash, JSON.stringify(parseResult)],
    )
  } finally {
    await db.end()
  }

  return NextResponse.json([fileName, hash, parseResult])
}
