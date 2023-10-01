import Container from '@/components/container'
import { loadEV } from '@/app/ev-database/ev-database-server'
import React from 'react'
import MainTitle from '@/components/main-title'

interface ParamType {
  brand: string
  year: string
  model: string
}

// Generate segments for both [category] and [product]
export async function generateStaticParams() {
  let headers = (await loadEV())
    .filter((r) => !!r.Brand && !!r['Model Year'] && !!r['Model Name'])
    .map(
      (product): ParamType => ({
        brand: product.Brand.toLowerCase(),
        year: product['Model Year']!.toString().toLowerCase(),
        model: product['Model Name']!.toLowerCase(),
      }),
    )

  // hack to remove duplicates, caution: only works because the props are in the same order
  headers = Array.from(new Set(headers.map((x) => JSON.stringify(x))))
    .sort()
    .map((str) => JSON.parse(str)) as ParamType[]

  return headers
}

export default function Page({ params }: { params: ParamType }) {
  return (
    <Container>
      <MainTitle>{decodeURIComponent(params.brand)}</MainTitle>
    </Container>
  )
}
