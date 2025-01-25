import 'server-only'
import MainTitle from '@/components/main-title'
import ChangePasswordForm from './ChangePasswordForm'
import UserInfoForm from './UserInfoForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import requireSession from '@/server_lib/requireSession'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

async function changePasswordAction(formData: FormData) {
  'use server'
  const session = await requireSession()
  // Implement password change logic here
  throw new Error('Not implemented')
}

export default async function MyAccountPage() {
  const session = await requireSession()

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <MainTitle>My Account</MainTitle>
        <p className="text-lg mb-6">Welcome, {session.name || 'User'}</p>

        <Tabs defaultValue="user-info" className="w-full">
          <TabsList>
            <TabsTrigger value="user-info">User Information</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
          </TabsList>

          <TabsContent value="user-info">
            <div className="mt-4">
              <UserInfoForm currentName={session.name} />
            </div>
          </TabsContent>

          <TabsContent value="authentication">
            <div className="mt-4 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <ChangePasswordForm changePasswordAction={changePasswordAction} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Connect GitHub
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
