'use server'
import 'server-only'
import db from '@/lib/db'
import { z } from 'zod'
import { saveSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const User = z.object({
  email: z.string(),
  password: z.string(),
})

export default async function SignInAction(formData: FormData) {
  try {
    const user = User.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
    const res = await db.query(
      `select uid,
              email,
              pw,
              ax_maxmin,
              ax_homes,
              ax_tax,
              ax_evdb,
              ax_spgp
       from users
       where email = ?
         and pw = SHA2(CONCAT(?, CAST(salt AS char)), 0)
          or pw = ?`,
      [user.email, user.password, user.password],
    )
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

      // set the cookie
      await saveSession(dbObj)

      // https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#redirecting
      redirect('/')
    }
  } finally {
    await db.end()
  }
}
