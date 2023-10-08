import 'server-only'
import { z } from 'zod'
import React from 'react'
import SignInForm from '@/app/auth/sign-in/SignInForm'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { getSession, saveSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import SignInAction from '@/app/auth/sign-in/SigninAction'

export default async function SignInPage() {
  const session = await getSession()
  return (
    <form action={SignInAction}>
      <p>Current uid {session?.uid ?? 'null'}</p>
      <SignInForm />
    </form>
  )
}
