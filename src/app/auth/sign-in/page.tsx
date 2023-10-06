import 'server-only'
import { z } from 'zod'
import React from 'react'
import SignInForm from '@/app/auth/sign-in/SignInForm'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { getSession, saveSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const User = z.object({
  email: z.string(),
  password: z.string(),
})

export default async function SignInPage() {
  const session = await getSession()

  async function signIn(formData: FormData) {
    'use server'
    try {
      const user = User.parse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      const res = await db.query(
        'select uid, email, pw from users where email = ? and pw = SHA2(CONCAT(?,CAST(salt AS char)), 0) or pw = ?',
        [user.email, user.password, user.password],
      )
      if (!Array.isArray(res) || res.length == 0) {
        // login failed
      } else {
        const dbObj = z
          .object({ uid: z.number(), email: z.string(), pw: z.string() })
          .parse(res[0])

        // pw was not encrypted at rest! fix that :)
        if (dbObj.pw === user.password) {
          const salt = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
          await db.query(
            'update users set salt = ?, pw = SHA2(CONCAT(?, CAST(? as char)), 0) where uid = ?',
            [salt, user.password, salt, dbObj.uid],
          )
        }

        // set the cookie
        await saveSession({ uid: dbObj.uid })

        // https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#redirecting
        redirect('/')
      }
    } finally {
      await db.end()
    }
  }

  return (
    <form action={signIn}>
      <p>Current uid {session?.uid ?? 'null'}</p>
      <SignInForm />
    </form>
  )
}
