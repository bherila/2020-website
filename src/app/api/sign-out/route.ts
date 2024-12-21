import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // Clear session cookie
  const response = new Response(
    `<script>
      localStorage.removeItem('session-cache');
      window.location.href = '/auth/sign-out';
    </script>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'bwh-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax',
      },
    },
  )

  return response
}
