import 'server-only'
import { getSession } from '@/server_lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import RSUPage from '@/app/rsu/RSUPage'

export default async function TimeseriesDataPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn + '?next=/timeseries-data/')
    return null
  }
  return <RSUPage />
}
