'use client'
import { Button } from '@/components/ui/button'
import authClient from '@/lib/auth-client'
import { cn } from '@/lib/utils'
import { GithubIcon } from '@/components/custom-icons/GithubIcon'

export const GithubSignIn: React.FC<{}> = () => {
  return (
    <Button
      variant="outline"
      className={cn('w-full gap-2')}
      onClick={async () => {
        await authClient.signIn.social({
          provider: 'github',
          callbackURL: '/dashboard',
        })
      }}
    >
      <GithubIcon />
      Sign in with Github
    </Button>
  )
}
