import { verifyRegistrationResponse } from '@simplewebauthn/server'
import { getSession } from '@/server_lib/session'
import db from '@/server_lib/db'

export async function POST(request: Request) {
  const session = await getSession()
  if (!session?.uid) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const credential = await request.json()
    
    // Get and verify challenge
    const [storedChallenge] = await db.query(
      'SELECT challenge FROM webauthn_challenges WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
      [session.uid]
    ) as { challenge: string }[]

    if (!storedChallenge) {
      return new Response('Challenge expired or not found', { status: 400 })
    }

    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: storedChallenge.challenge,
      expectedOrigin: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000',
      expectedRPID: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    })

    if (verification.verified) {
      const { credentialID, credentialPublicKey } = verification.registrationInfo || {}
      
      await db.query(
        'UPDATE users SET passkey_credential_id = ?, passkey_public_key = ? WHERE uid = ?',
        [
          Buffer.from(credentialID).toString('base64'),
          Buffer.from(credentialPublicKey).toString('base64'),
          session.uid
        ]
      )

      return new Response(null, { status: 200 })
    }

    return new Response('Verification failed', { status: 400 })
  } catch (error) {
    console.error(error)
    return new Response('Error verifying registration', { status: 500 })
  }
}
