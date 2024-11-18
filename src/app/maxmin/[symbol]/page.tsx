import 'server-only'

import AuthRoutes from '@/app/auth/AuthRoutes'
import { getSession } from '@/lib/session'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.material.purple.dark.compact.css'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import Container from 'react-bootstrap/Container'
import MinMaxClientDataLoader from './MinMaxClientDataLoader'

interface Props {
  params: Promise<{ symbol: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = (await params).symbol.toUpperCase()
  return {
    title: `MaxMin Tool - ${id}`,
  }
}

export default async function Page({ params }: Props) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }

  const { symbol } = await params
  if (!symbol) {
    return (
      <div>
        No symbol. Use like: <pre>/maxmin/[symbol]</pre>
      </div>
    )
  }
  if (symbol !== symbol.toUpperCase()) {
    redirect(`/maxmin/${symbol.toUpperCase()}/`)
    return null
  }
  return (
    <Container fluid={true}>
      <MinMaxClientDataLoader symbol={symbol} />
    </Container>
  )
}
