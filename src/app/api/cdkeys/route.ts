import 'server-only'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import mysql from '@/server_lib/db'
import ProductKeySchema from '@/lib/productKeySchema'
import { getSession } from '@/server_lib/session'

export async function POST(req: Request) {
  try {
    const productKeyData = ProductKeySchema.parse(req.body)
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const { product_id, product_key, product_name, computer_name, comment, used_on } = productKeyData

    const result: any = await mysql.query(
      'INSERT INTO product_keys (uid, product_id, product_key, product_name, computer_name, comment, used_on) values (?, ?, ?, ?, ?, ?, ?)',
      [uid, product_id, product_key, product_name, computer_name, comment, used_on],
    )

    return NextResponse.json({ id: result.insertId }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const productKeyData = ProductKeySchema.parse(req.body)
  const uid = (await getSession())?.uid
  if (!uid) {
    return NextResponse.json({ error: 'not logged in' }, { status: 403 })
  }

  try {
    const result: any = await mysql.query('UPDATE product_keys SET ? WHERE id = ? and uid = ?', [
      productKeyData,
      productKeyData.id,
      uid,
    ])

    if (result.affectedRows === 0) {
      return NextResponse.json({}, { status: 404 })
    } else {
      return NextResponse.json({}, { status: 204 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({}, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const productKeys = await mysql.query('SELECT * FROM product_keys where uid = ? order by product_name', [uid])
    return NextResponse.json(productKeys)
  } catch (error) {
    console.error(error)
    return NextResponse.json({}, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const uid = (await getSession())?.uid
    if (!uid) {
      return NextResponse.json({ error: 'not logged in' }, { status: 403 })
    }
    const id = z.object({ id: z.number() }).parse(await req.json())
    const result: any = await mysql.query('DELETE FROM product_keys WHERE id = ? and uid = ?', [id, uid])
    if (result.affectedRows === 0) {
      return NextResponse.json({}, { status: 404 })
    } else {
      return NextResponse.json({}, { status: 204 })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({}, { status: 500 })
  }
}
