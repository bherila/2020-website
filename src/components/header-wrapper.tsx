import 'server-only'
import getServerSession from '@/server_lib/getServerSession'
import Header from './header'

export default async function HeaderWrapper(props: {}) {
  const session = await getServerSession()
  return <Header session={session} />
}
