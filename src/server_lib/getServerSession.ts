import 'server-only'
import { headers } from 'next/headers'
import { sessionType } from '@/lib/sessionSchema'

export default async function getServerSession() {
  const headersList = await headers()
  return JSON.parse(headersList.get('x-session-data') || '{uid: 0}') as sessionType
}
