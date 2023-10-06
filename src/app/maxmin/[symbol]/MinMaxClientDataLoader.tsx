'use client'
import useSWR from 'swr'
import React from 'react'
import AlphaVantageEarnings from '@/lib/AlphaVantageEarnings'
import StockQuote from '@/lib/StockQuote'
import MinMaxClientRenderer from '@/app/maxmin/[symbol]/MinMaxClientRenderer'
import Container from '@/components/container'
import Spinner from 'react-bootstrap/Spinner'
import cn from 'classnames'

const fetcher = (e: any) => fetch(e).then((r) => r.json())

interface ResultType {
  quotes: StockQuote[]
  earnings: AlphaVantageEarnings
}

export default function MinMaxClientDataLoader(props: { symbol: string }) {
  const { symbol } = props
  const uri = `/api/stocks/${symbol}/`
  const { data, error } = useSWR<ResultType>(uri, fetcher)
  if (!data) {
    return (
      <Container>
        <div className={cn('text-center', 'py-5')}>
          <Spinner />
        </div>
      </Container>
    )
  }
  if (!data.quotes) {
    return <div>Missing data.quotes</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  return <MinMaxClientRenderer {...data} {...props} />
}
