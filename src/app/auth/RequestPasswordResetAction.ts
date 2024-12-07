'use server'
import 'server-only'
import { z } from 'zod'
import db from '@/server_lib/db'
import { randomBytes } from 'crypto'
import { sendPasswordResetEmail } from '@/server_lib/email'

const ResetRequest = z.object({
  email: z.string().email(),
})

/*
ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(64),
ADD COLUMN reset_requested_at DATETIME;*/

export async function RequestPasswordResetAction(formData: FormData) {
  try {
    const { email } = ResetRequest.parse({
      email: formData.get('email'),
    })

    // Check if a reset was requested in the last 5 minutes
    const [lastReset] = (await db.query(
      'SELECT reset_requested_at FROM users WHERE email = ? AND reset_requested_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
      [email],
    )) as { reset_requested_at: Date }[]

    if (lastReset) {
      // Don't reveal if email exists, just return
      return
    }

    const resetToken = randomBytes(32).toString('hex')

    await db.query('UPDATE users SET reset_token = ?, reset_requested_at = NOW() WHERE email = ?', [resetToken, email])

    // Don't reveal if email exists by checking update result
    await sendPasswordResetEmail(email, resetToken)
  } finally {
    await db.end()
  }
}
