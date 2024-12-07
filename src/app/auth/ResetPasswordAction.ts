'use server'
import 'server-only'
import { z } from 'zod'
import db from '@/server_lib/db'
import { saveSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'

const ResetRequest = z.object({
  key: z.string(),
  password: z.string().min(8),
})

export async function ResetPasswordAction(formData: FormData) {
  try {
    const { key, password } = ResetRequest.parse({
      key: formData.get('key'),
      password: formData.get('password'),
    })

    // Verify token and get user
    const [user] = (await db.query(
      'SELECT uid, email FROM users WHERE reset_token = ? AND reset_requested_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
      [key],
    )) as { uid: number; email: string }[]

    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    // Update password and clear reset token
    const salt = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
    await db.query(
      'UPDATE users SET salt = ?, pw = SHA2(CONCAT(?, CAST(? as char)), 0), reset_token = NULL, reset_requested_at = NULL WHERE uid = ?',
      [salt, password, salt, user.uid],
    )

    // Log user in
    await saveSession({
      uid: user.uid,
      email: user.email,
    })

    redirect('/my-account')
  } finally {
    await db.end()
  }
}
