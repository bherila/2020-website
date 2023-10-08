import React from 'react'
import SignInForm from '@/app/auth/sign-in/SignInForm'
import { getSession } from '@/lib/session'
import SignInAction from '@/app/auth/SigninAction'

export default async function SignInPage() {
  const session = await getSession()
  return (
    <form action={SignInAction}>
      <p>Current uid {session?.uid ?? 'null'}</p>
      <SignInForm />
    </form>
  )
}
