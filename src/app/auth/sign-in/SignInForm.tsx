'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GithubSignIn } from './GithubSignIn'
import { EmailSignIn } from './EmailSignIn.action'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useActionState } from 'react'
import { SignInFormState } from './SignInFormState'

export default function SignIn(props: { nextUrl?: string }) {
  const [state, action, isPending] = useActionState<SignInFormState>(EmailSignIn, { email: '', password: '' })

  return (
    <form action={action}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue={state.email}
                autoFocus={!state.email} // Autofocus email if it's empty
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                required
                autoFocus={!!state.email} // Autofocus password if email is filled
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sign In
            </Button>

            <div className={cn('w-full gap-2 flex items-center', 'justify-between flex-col')}>
              <GithubSignIn />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
