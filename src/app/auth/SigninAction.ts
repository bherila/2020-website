'use server'
import 'server-only'
import db from '@/server_lib/db'
import { z } from 'zod'
import { saveSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'

const User = z.object({
  email: z.string(),
  password: z.string(),
})

export async function validateUserPassword(email: string, password: string, salt?: number) {
  const query = salt !== undefined
    ? 'select uid, email, pw from users where email = ? and pw = SHA2(CONCAT(?, CAST(? as char)), 0)'
    : 'select uid, email, pw, salt from users where email = ? and pw = SHA2(CONCAT(?, CAST(salt AS char)), 0) or pw = ?'
  
  const params = salt !== undefined
    ? [email, password, salt]
    : [email, password, password]

  return await db.query(query, params)
}

export default async function SignInAction(formData: FormData) {
  try {
    const user = User.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    const res = await validateUserPassword(user.email, user.password)

    if (!Array.isArray(res) || res.length == 0) {
      // login failed
    } else {
      const dbObj = z
        .object({
          uid: z.number().nonnegative(),
          email: z.string().email(),
          pw: z.string(),
          ax_maxmin: z.coerce.boolean(),
          ax_homes: z.coerce.boolean(),
          ax_tax: z.coerce.boolean(),
          ax_evdb: z.coerce.boolean(),
          ax_spgp: z.coerce.boolean(),
          ax_phr: z.coerce.boolean(),
        })
        .parse(res[0])

      // pw was not encrypted at rest! fix that :)
      if (dbObj.pw === user.password) {
        const salt = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
        await db.query('update users set salt = ?, pw = SHA2(CONCAT(?, CAST(? as char)), 0) where uid = ?', [
          salt,
          user.password,
          salt,
          dbObj.uid,
        ])
      }

      await saveSession(dbObj)
      redirect('/')
    }
  } finally {
    await db.end()
  }
}
