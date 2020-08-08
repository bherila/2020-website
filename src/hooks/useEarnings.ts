import useSWR from 'swr'

export interface IEarnings {
  symbol: string
  date: string
  qtr: string
  eps: number | null
  eps_est: number | null
  release_time: 'pre' | 'post'
}

const fetcher = (e) => fetch(e).then((r) => r.json())

export default function useEarnings(symbol) {
  const result = useSWR('/api/hello?symbol=' + symbol, fetcher, {
    revalidateOnFocus: false,
  })
  return {
    hasEarnings: !!result.data,
    data: result.data as IEarnings[],
    isFetching: result.isValidating,
  }
}
