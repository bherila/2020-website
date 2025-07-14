import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Spinner } from '@/components/ui/spinner'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { IAward } from '@/app/rsu/IAward'

interface RsuVestingPriceProps {
  vestingPriceData: VestingPriceData[]
  loading: boolean
}

interface VestingPriceData {
  vest_date: string
  symbol: string
  share_count: number
  vesting_price: number | null
}

export function RsuVestingPrice({ vestingPriceData, loading }: RsuVestingPriceProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner />
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vest Date</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Vesting Price</TableHead>
          <TableHead>Total Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vestingPriceData.map((data, i) => (
          <TableRow key={i}>
            <TableCell>{data.vest_date}</TableCell>
            <TableCell>{data.symbol}</TableCell>
            <TableCell>{data.share_count}</TableCell>
            <TableCell>{data.vesting_price !== null ? `$${data.vesting_price.toFixed(2)}` : 'N/A'}</TableCell>
            <TableCell>
              {data.vesting_price !== null ? `$${(data.share_count * data.vesting_price).toFixed(2)}` : 'N/A'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
