import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './server_lib/session'

export async function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  try {
    // Fetch session data
    const session = await getSession()

    // Add session data to header
    requestHeaders.set('x-session-data', JSON.stringify(session))
  } catch (error) {
    // If there's an error, set empty session data
    requestHeaders.set('x-session-data', JSON.stringify({}))
  }

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Only run middleware on routes that need auth/session
    '/finance/:path*',
    '/my-account/:path*',
    '/keys/:path*',
    '/phr/:path*',
    '/payslip/:path*',
    '/rsu/:path*',
    '/spgp/:path*',
    // Exclude static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
