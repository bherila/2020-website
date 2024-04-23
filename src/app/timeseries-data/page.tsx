import 'server-only'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import RSUPage from '@/app/rsu/RSUPage'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

export default async function TimeseriesDataPage() {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn + '?next=/timeseries-data/')
    return null
  }
  return <RSUPage />
}
