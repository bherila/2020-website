import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.clone()
  url.pathname = '/auth/sign-out'
  let response = NextResponse.redirect(url)
  response.cookies.delete('bwh-session')
  return response
}
