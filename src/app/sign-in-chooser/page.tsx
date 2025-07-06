import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/container'
import MainTitle from '@/components/main-title'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function SignInChooserPage() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <MainTitle>Sign in</MainTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Link
            href="/auth/sign-in"
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-xl font-semibold">This website</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in for Ben website services.</p>
          </Link>
          <a
            href="https://ac.bherila.net"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-xl font-semibold">ActiveCollab Project Management</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Sign in if you're working with Ben on a project and want to manage tasks and billing.
            </p>
          </a>
        </div>
      </div>
    </Container>
  )
}
