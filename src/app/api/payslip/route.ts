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
      select payslip_id,
             cast(period_start as char) as period_start,
             cast(period_end as char)   as period_end,
             cast(pay_date as char)     as pay_date,
             earnings_gross,
             earnings_bonus,
             earnings_net_pay,
             earnings_rsu,
             imp_other,
             imp_legal,
             imp_fitness,
             imp_ltd,
             ps_oasdi,
             ps_medicare,
             ps_fed_tax,
             ps_fed_tax_addl,
             ps_state_tax,
             ps_state_tax_addl,
             ps_state_disability,
             ps_401k_pretax,
             ps_401k_aftertax,
             ps_401k_employer,
             ps_fed_tax_refunded,
             ps_payslip_file_hash,
             ps_is_estimated,
             ps_comment,
             ps_pretax_medical,
             ps_pretax_dental,
             ps_pretax_vision,
             ps_pretax_fsa,
             ps_salary,
             ps_vacation_payout,
             other
      from fin_payslip
      where uid = ?
      order by pay_date`,
    [uid],
  )

  data = data.map((r) => ({
    ...r,
    other: typeof r.other === 'string' ? JSON.parse(r.other) : r.other,
  }))

  return NextResponse.json(z.array(fin_payslip_schema).parse(data))
}

export async function POST(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  const formData = await req.formData()

  const parsedJson = formData.get('parsed_json') as string
  if (parsedJson) {
    const rowsToInsert: any[][] = z
      .array(fin_payslip_schema)
      .parse(JSON.parse(parsedJson))
      .map((obj: fin_payslip) => {
        return [
          uid,
          obj.period_start ?? null,
          obj.period_end ?? null,
          obj.pay_date ?? null,
          obj.earnings_gross ?? null,
          obj.earnings_bonus ?? null,
          obj.earnings_net_pay ?? null,
          obj.earnings_rsu ?? null,
          obj.imp_other ?? null,
          obj.imp_legal ?? null,
          obj.imp_fitness ?? null,
          obj.imp_ltd ?? null,
          obj.ps_oasdi ?? null,
          obj.ps_medicare ?? null,
          obj.ps_fed_tax ?? null,
          obj.ps_fed_tax_addl ?? null,
          obj.ps_state_tax ?? null,
          obj.ps_state_tax_addl ?? null,
          obj.ps_state_disability ?? null,
          obj.ps_401k_pretax ?? null,
          obj.ps_401k_aftertax ?? null,
          obj.ps_401k_employer ?? null,
          obj.ps_fed_tax_refunded ?? null,
          obj.ps_payslip_file_hash ?? null,
          obj.ps_is_estimated ? 1 : 0,
          obj.ps_comment ?? null,
          obj.ps_vacation_payout ?? null,
          obj.ps_pretax_medical ?? null,
          obj.ps_pretax_dental ?? null,
          obj.ps_pretax_vision ?? null,
          obj.ps_pretax_fsa ?? null,
          obj.ps_salary ?? null,
          JSON.stringify(obj.other),
        ]
      })
    try {
      await db.query(
        `
            replace into fin_payslip ( uid, period_start
                                     , period_end
                                     , pay_date
                                     , earnings_gross
                                     , earnings_bonus
                                     , earnings_net_pay
                                     , earnings_rsu
                                     , imp_other
                                     , imp_legal
                                     , imp_fitness
                                     , imp_ltd
                                     , ps_oasdi
                                     , ps_medicare
                                     , ps_fed_tax
                                     , ps_fed_tax_addl
                                     , ps_state_tax
                                     , ps_state_tax_addl
                                     , ps_state_disability
                                     , ps_401k_pretax
                                     , ps_401k_aftertax
                                     , ps_401k_employer
                                     , ps_fed_tax_refunded
                                     , ps_payslip_file_hash
                                     , ps_is_estimated
                                     , ps_comment
                                     , ps_vacation_payout
                                     , ps_pretax_medical
                                     , ps_pretax_dental
                                     , ps_pretax_vision
                                     , ps_pretax_fsa
                                     , ps_salary
                                     , other)
            values ?
        `,
        [rowsToInsert],
      )
    } finally {
      await db.end()
    }
    return await GET(req)
  }

  const pdfFile: any = formData.get('pdf')
  let fileName = ''
  let hash = ''

  if (typeof pdfFile === 'object') {
    fileName = pdfFile.name
    const fileBuffer = Buffer.from(await pdfFile.arrayBuffer())
    hash = createHash('sha1').update(fileBuffer.toString('binary')).digest('hex')
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
      `insert into fin_payslip_uploads (file_name, file_hash, parsed_json)
       values (?, ?, ?)`,
      [fileName, hash, JSON.stringify(parseResult)],
    )
  } finally {
    await db.end()
  }

  return NextResponse.json([fileName, hash, parseResult])
}
