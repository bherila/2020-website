'use client'

import dynamic from 'next/dynamic'
import 'graphiql/graphiql.css'

const GraphiQLComponent = dynamic(() => import('graphiql'), {
  ssr: false,
  loading: () => <div>Loading GraphiQL...</div>,
})

export default function GraphiQLPage() {
  const fetcher = async (graphQLParams: any) => {
    const data = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
      cache: 'no-store',
      credentials: 'include',
    })
    return data.json()
  }

  return (
    <div style={{ height: '100vh' }}>
      <GraphiQLComponent fetcher={fetcher as any} />
    </div>
  )
}
