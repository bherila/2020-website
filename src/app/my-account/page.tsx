import 'server-only'
import MainTitle from '@/components/main-title'
import ChangePasswordForm from './ChangePasswordForm'
import requireSession from '@/server_lib/requireSession'

async function changePasswordAction(formData: FormData) {
  'use server'
  const session = await requireSession()
  // Implement password change logic here
  throw new Error('Not implemented')
}

export default async function MyAccountPage() {
  await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>My Account</MainTitle>
        <div className="mt-4">
          <ChangePasswordForm changePasswordAction={changePasswordAction} />
        </div>
      </div>
    </div>
  )
}
