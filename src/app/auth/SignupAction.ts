'use server'

import { SignupZod } from '@/app/auth/SignupSchema'
import SignInAction from '@/app/auth/SigninAction'
import db from '@/lib/db'
import { ZodError } from 'zod'
import { saveSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function SignupAction(
  formData: FormData,
): Promise<void> {
  try {
    const signup = SignupZod.parse(Object.fromEntries(formData))
    const exist: { c: number }[] = await db.query(
      'select count(*) as c from users where email = ?',
      [signup.email],
    )
    if (exist[0].c !== 0) {
      // try login
      try {
        await SignInAction(formData)
      } catch {
        //ignore
      }
      // fail
      throw new Error('A user may exist with this email (or the check failed)')
    }

    const { err, result, fields } = (await db.query(
      'insert into users (email, pw, salt, alias) values (?, ?, ?, ?)',
      [
        signup.email,
        signup.password,
        Math.random() * Number.MAX_SAFE_INTEGER,
        signup.username,
      ],
    )) as any

    const userId: number = result.insertId
    await saveSession({ uid: userId })
    redirect('/')
  } catch (err) {
    console.error(err)
  } finally {
    await db.end()
  }
}
