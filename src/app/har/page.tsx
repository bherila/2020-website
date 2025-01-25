import 'server-only'
import RSUPage from '@/app/rsu/RSUPage'
import requireSession from '@/server_lib/requireSession'

export default async function Har() {
  requireSession()
  return <RSUPage />
}
