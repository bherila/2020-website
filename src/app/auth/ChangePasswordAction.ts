import 'server-only'
import { z } from 'zod'
import { getSession } from '@/lib/session'
import db from '@/lib/db'

export default async function ChangePasswordAction(formData: FormData) {
  'use server'
  const sanitized = z.object({ password: z.string().min(8), uid: z.number().gt(0) }).parse({
    password: formData.get('password'),
    uid: (await getSession())?.uid,
  })
  const newSalt = Math.random() * Number.MAX_SAFE_INTEGER
  await db.query('update users set pw = SHA2(CONCAT(?,CAST(? AS char)), 0), salt = ? where uid = ?', [
    sanitized.password,
    newSalt,
    newSalt,
    sanitized.uid,
  ])
}
