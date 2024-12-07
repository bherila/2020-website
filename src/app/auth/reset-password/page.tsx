import { redirect } from 'next/navigation'
import Container from '@/components/container'
import Card from '@/components/card'
import CardContent from '@/components/cardcontent'
import { ResetPasswordAction } from '../ResetPasswordAction'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const key = (await searchParams).key

  if (!key || typeof key !== 'string') {
    redirect('/auth/sign-in')
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <h2>Reset Password</h2>
          <form action={ResetPasswordAction}>
            <input type="hidden" name="key" value={key} />
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input type="password" className="form-control" id="password" name="password" required minLength={8} />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Password
            </button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}
