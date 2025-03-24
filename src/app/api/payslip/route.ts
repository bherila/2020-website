import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import deepRemoveKey from '@/lib/DeepRemoveKey'
import { prisma } from '@/server_lib/prisma'
import { fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { getSession } from '@/server_lib/session'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json('Unauthorized', { status: 403 })
  }

  var year = req.nextUrl.searchParams.get('year') ?? new Date().getFullYear().toString()
  var start = year + '-01-01'
  var end = year + '-12-31'
  // validate year is between 1900 and 2100
  if (year < '1900' || year > '2100') {
    return NextResponse.json('Invalid year', { status: 400 })
  }

  let data = await prisma.finPayslips.findMany({
    where: {
      uid: uid,
      pay_date: {
        gt: start,
        lt: end,
      },
    },
    orderBy: {
      pay_date: 'asc',
    },
  })

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
    const rowsToInsert = z
      .array(fin_payslip_schema)
      .parse(JSON.parse(parsedJson))
      .map((obj: z.infer<typeof fin_payslip_schema>) => {
        return {
          ...obj,
          other: JSON.stringify(obj.other),
        }
      })
    try {
      await prisma.$transaction(
        rowsToInsert.map((row) =>
          prisma.finPayslips.upsert({
            where: {
              uid_period_start_period_end_pay_date: {
                uid,
                period_start: row.period_start!,
                period_end: row.period_end!,
                pay_date: row.pay_date!,
              },
            },
            create: { uid, ...row },
            update: row,
          }),
        ),
      )
    } catch (error) {
      console.error('Error saving payslips:', error)
      return NextResponse.json({ error: 'Failed to save payslips' }, { status: 500 })
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
    await prisma.finPayslipUploads.create({
      data: {
        file_name: fileName,
        file_hash: hash,
        parsed_json: JSON.stringify(parseResult),
      },
    })
  } catch (error) {
    console.error('Error saving upload record:', error)
    return NextResponse.json({ error: 'Failed to save upload record' }, { status: 500 })
  }

  return NextResponse.json([fileName, hash, parseResult])
}
