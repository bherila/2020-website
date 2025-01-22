import { redirect } from 'next/navigation'
import Container from '@/components/container'
import ChangePasswordForm from './ChangePasswordForm'
import ChangePasswordAction from '@/app/auth/ChangePasswordAction'
import requireSession from '@/server_lib/requireSession'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Masonry from '@/components/ui/masonry'

export default async function MyAccountPage() {
  const session = await requireSession('/my-account')

  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <Container>
      <h1 className="mb-6 text-3xl font-bold">My Account</h1>

      <Masonry columnsCount={2} gutter="1rem">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Email:</span> {session.email}
              </p>
              <p>
                <span className="font-medium">ID:</span> {session.uid}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm changePasswordAction={ChangePasswordAction} />
          </CardContent>
        </Card>
      </Masonry>
    </Container>
  )
}

export const metadata = {
  title: 'My Account',
}
