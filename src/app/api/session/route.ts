import { getSession } from '@/server_lib/session'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(await getSession(), {
    headers: [
      // Increase cache time to 1 hour with stale-while-revalidate
      ['Cache-Control', 's-maxage=3600, stale-while-revalidate=86400'],
    ],
  })
}
