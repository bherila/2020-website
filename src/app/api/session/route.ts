import { getSession } from '@/server_lib/session'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(await getSession(), {
    headers: [['Cache-Control', 's-maxage=5, stale-while-revalidate']],
  })
}
