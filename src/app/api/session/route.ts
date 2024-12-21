import { getSession } from '@/server_lib/session'
import { NextResponse } from 'next/server'

export async function POST() {
  const session = await getSession()
  // Ensure we only return a plain object
  const serializedSession = {
    uid: session.uid,
    email: session.email,
    ax_maxmin: session.ax_maxmin,
    ax_homes: session.ax_homes,
    ax_tax: session.ax_tax,
    ax_evdb: session.ax_evdb,
    ax_spgp: session.ax_spgp,
    ax_phr: session.ax_phr,
  }

  return NextResponse.json(serializedSession, {
    headers: [
      // Increase cache time to 1 hour with stale-while-revalidate
      ['Cache-Control', 's-maxage=3600, stale-while-revalidate=86400'],
    ],
  })
}
