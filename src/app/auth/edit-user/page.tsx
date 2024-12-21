import { getSession } from '@/server_lib/session'
import { redirect, RedirectType } from 'next/navigation'
import Container from '@/components/container'
import ChangePasswordAction from '@/app/auth/ChangePasswordAction'
import AuthRoutes from '@/app/auth/AuthRoutes'

export default async function EditUserPage() {
  const session = await getSession()
  if (session?.uid == null) {
    return redirect(AuthRoutes.signIn, RedirectType.replace)
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
