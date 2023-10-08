import 'server-only'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'
import React from 'react'
import Container from '@/components/container'
import ChangePasswordAction from '@/app/auth/edit-user/ChangePasswordAction'

export default async function EditUserPage() {
  const session = await getSession()
  if (session?.uid == null) {
    return redirect('/auth/sign-in', RedirectType.replace)
  }

  return (
    <Container>
      <form action={ChangePasswordAction}>
        <h2>Change password</h2>
        New password: <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </Container>
  )
}
