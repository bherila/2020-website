import { verifyAuthenticationResponse } from '@simplewebauthn/server'
import db from '@/server_lib/db'
import { saveSession } from '@/server_lib/session'

export async function POST(request: Request) {
  try {
    const credential = await request.json()

    // TODO: Get stored challenge from database
    const [storedChallenge] = await db.query(
      'SELECT challenge FROM webauthn_challenges WHERE user_id = ? AND created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
      [session.uid]
    ) as { challenge: string }[]

    // Get user's public key
    const [user] = await db.query(
      'SELECT uid, email, passkey_public_key FROM users WHERE passkey_credential_id = ?',
      [Buffer.from(credential.id, 'base64').toString('base64')]
    ) as { uid: number; email: string; passkey_public_key: string }[]

    if (!user?.passkey_public_key) {
      return new Response('User not found', { status: 400 })
    }

    const verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: storedChallenge.challenge,
      expectedOrigin: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000',
      expectedRPID: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
      authenticator: {
        credentialPublicKey: Buffer.from(user.passkey_public_key, 'base64'),
        credentialID: Buffer.from(credential.id, 'base64'),
        counter: 0,
      },
    })

    if (verification.verified) {
      await saveSession({
        uid: user.uid,
        email: user.email,
      })
      return new Response(null, { status: 200 })
    }

    return new Response('Verification failed', { status: 400 })
  } catch (error) {
    console.error(error)
    return new Response('Error verifying authentication', { status: 500 })
  }
}
