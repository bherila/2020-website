import { generateAuthenticationOptions } from '@simplewebauthn/server'
import db from '@/server_lib/db'

export async function GET() {
  try {
    // Get all registered credential IDs to allow any registered passkey
    const credentials = await db.query(
      'SELECT passkey_credential_id FROM users WHERE passkey_credential_id IS NOT NULL'
    ) as { passkey_credential_id: string }[]

    const options = await generateAuthenticationOptions({
      rpID: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
      allowCredentials: credentials.map(c => ({
        id: Buffer.from(c.passkey_credential_id, 'base64'),
        type: 'public-key',
      })),
    })

    // Store challenge and clean up old ones
    await db.query('DELETE FROM webauthn_challenges WHERE created_at < DATE_SUB(NOW(), INTERVAL 5 MINUTE)')
    await db.query('INSERT INTO webauthn_challenges (challenge) VALUES (?)', [options.challenge])
    
    return Response.json(options)
  } catch (error) {
    console.error(error)
    return new Response('Error generating auth options', { status: 500 })
  }
}
