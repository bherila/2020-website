import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import deepRemoveKey from '@/lib/DeepRemoveKey'
import db from '@/lib/db'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const pdfFile = formData.get('pdf')
  let fileName = ''
  let hash = ''
  if (pdfFile instanceof File) {
    fileName = pdfFile.name
    const fileBuffer = Buffer.from(await pdfFile.arrayBuffer())
    hash = createHash('sha1').update(fileBuffer).digest('hex')
    return NextResponse.json({ hash, fileName })
  }

  let parseResult: any = {}
  let jsonFile = formData.get('json')
  if (jsonFile instanceof File) {
    jsonFile = await jsonFile.text()
  }
  if (!!jsonFile) {
    try {
      parseResult = JSON.parse(jsonFile)
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
      `insert into fin_payslip_uploads (file_name, file_hash, parsed_json) values ?`,
      [[fileName, hash, JSON.stringify(parseResult)]],
    )
  } finally {
    await db.end()
  }

  return NextResponse.json({})
}
