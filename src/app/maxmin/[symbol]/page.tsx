import React from 'react'
import MinMaxClientDataLoader from './MinMaxClientDataLoader'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.material.purple.dark.compact.css'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

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

export default function Page({ params }: Props) {
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
  return <MinMaxClientDataLoader symbol={symbol} />
}
