import { headers } from 'next/headers'
import { sessionType } from '@/lib/sessionSchema'
import Header from './header'

export default async function HeaderWrapper() {
  const headersList = await headers()
  const session: sessionType = JSON.parse(headersList.get('x-session-data') || '{}')
  return <Header session={session} />
}
