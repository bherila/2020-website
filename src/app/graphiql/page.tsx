'use client'

import { GraphiQL } from 'graphiql'
import 'graphiql/graphiql.css'

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
      <GraphiQL fetcher={fetcher} />
    </div>
  )
}
