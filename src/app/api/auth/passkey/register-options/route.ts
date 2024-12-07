import { generateRegistrationOptions } from '@simplewebauthn/server'
import { getSession } from '@/server_lib/session'

export async function GET() {
  const session = await getSession()
  if (!session?.uid) {
    return new Response('Unauthorized', { status: 401 })
  }

  const options = await generateRegistrationOptions({
    rpName: 'Your App Name',
    rpID: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    userID: session.uid.toString(),
    userName: session.email || '',
    attestationType: 'none',
  })

  // Store challenge and clean up old challenges
  await db.query('DELETE FROM webauthn_challenges WHERE created_at < DATE_SUB(NOW(), INTERVAL 5 MINUTE)')
  await db.query('INSERT INTO webauthn_challenges (challenge, user_id) VALUES (?, ?)', [
    options.challenge,
    session.uid
  ])

  return Response.json(options)
}
