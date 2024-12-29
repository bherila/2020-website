import { redirect } from 'next/navigation'
import Container from '@/components/container'
import ChangePasswordForm from './ChangePasswordForm'
import getServerSession from '@/server_lib/getServerSession'
import ChangePasswordAction from '@/app/auth/ChangePasswordAction'

export default async function MyAccountPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <Container>
      <h1>My Account</h1>
      <h2>Account Details</h2>
      <p>Email: {session.email}</p>
      <p>ID: {session.uid}</p>
      <h2>Change Password</h2>
      <ChangePasswordForm changePasswordAction={ChangePasswordAction} />
    </Container>
  )
}

export const metadata = {
  title: 'My Account',
}
