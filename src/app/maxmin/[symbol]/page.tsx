import 'server-only'
import React from 'react'
import MinMaxClientDataLoader from './MinMaxClientDataLoader'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.material.purple.dark.compact.css'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import Container from 'react-bootstrap/Container'
import { getSession } from '@/lib/session'
import AuthRoutes from '@/app/auth/AuthRoutes'

interface Props {
  params: { symbol: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.symbol.toUpperCase()
  return {
    title: `MaxMin Tool - ${id}`,
  }
}

export default async function Page({ params }: Props) {
  if (!(await getSession())?.uid) {
    redirect(AuthRoutes.signIn)
    return null
  }
  if (!params.symbol) {
    return (
      <div>
        No symbol. Use like: <pre>/maxmin/[symbol]</pre>
      </div>
    )
  }
  if (params.symbol !== params.symbol.toUpperCase()) {
    redirect(`/maxmin/${params.symbol.toUpperCase()}/`)
    return null
  }
  const symbol = params.symbol.toUpperCase()
  return (
    <Container fluid>
      <MinMaxClientDataLoader symbol={symbol} />
    </Container>
  )
}
