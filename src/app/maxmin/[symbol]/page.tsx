import 'server-only'

import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import Container from 'react-bootstrap/Container'
import MinMaxClientDataLoader from './MinMaxClientDataLoader'
import requireSession from '@/server_lib/requireSession'

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
  const { symbol } = await params
  await requireSession(`/maxmin/${symbol}`)
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
