'use client'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import currency from 'currency.js'
import { fetchWrapper } from '@/lib/fetchWrapper'
import MainTitle from '@/components/main-title'
import { IAward } from '@/app/rsu/IAward'
import { RsuByVestDate } from '@/app/rsu/rsuByVestDate'
import { RsuByAward } from '@/app/rsu/rsuByAward'
import { vestStyle } from '@/app/rsu/vestStyle'
import dynamic from 'next/dynamic'
import Container from '@/components/container'

const RsuChartLazy = dynamic(() => import('./RsuChart'), {
  loading: () => <Spinner />,
})

// reused 2x
const header = (
  <thead>
    <tr>
      <th>Vest date</th>
      <th>Granted on</th>
      <th>Shares</th>
      <th>Grant ID</th>
    </tr>
  </thead>
)

export default function RSUPage() {
  const [shares, setShares] = useState<string>('')
  const [numShares, setNumShares] = useState('')
  const [awardId, setAwardId] = useState('')
  const [symbol, setSymbol] = useState('META')
  const [grantDate, setGrantDate] = useState('')

  const rowsToImport: IAward[] = shares
    .split('\n')
    .map((line) => {
      const cols = line
        .split(/\s/)
        .map((r) => r.trim())
        .filter(Boolean)
      if (cols.length !== 2) {
        return {} // skip
      }
      try {
        return {
          award_id: awardId,
          grant_date: grantDate,
          vest_date: cols[0],
          share_count: currency(cols[1]),
          symbol,
        }
      } catch {
        return {}
      }
    })
    .filter((r) => !!r.share_count)

  const [loading, setLoading] = useState(true)
  const [rsu, setRsu] = useState<IAward[]>([])
  useEffect(() => {
    fetchWrapper
      .get('/api/rsu/')
      .then((response) => setRsu(response))
      .catch(
        (e) =>
          (location.href =
            '/auth/sign-in/?e=' + encodeURIComponent(e.toString()) + '&back=' + encodeURIComponent(location.pathname)),
      )
      .finally(() => setLoading(false))
  }, [])

  if (!rsu) {
    return null
  }

  const now = new Date().toISOString().slice(0, 10)
  return (
    <Container>
      <div className="mb-8">
        <MainTitle>RSU App</MainTitle>
      </div>

      <div className="mb-8">
        <RsuChartLazy rsu={rsu} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-2">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">All vests</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vest date</TableHead>
                  <TableHead>Granted on</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Grant ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsu.map((r, i) => {
                  const vested = r.vest_date! < now
                  return (
                    <TableRow key={i} className={vested ? 'opacity-50 line-through' : ''}>
                      <TableCell>
                        {vested && '✔ '}
                        {r.vest_date}
                      </TableCell>
                      <TableCell>{r.grant_date}</TableCell>
                      <TableCell>{r.share_count?.toString()}</TableCell>
                      <TableCell>{r.award_id}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {loading && (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-8">
          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Per vest date</h3>
              <RsuByVestDate rsu={rsu} />
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Per award</h3>
              <RsuByAward rsu={rsu} />
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add an award</h3>
          <p className="mb-4 text-muted-foreground">
            Duplicate items (based on grant date + award id + vest date + symbol) will not be added
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetchWrapper
                .post('/api/rsu/', rowsToImport)
                .then((r) => setRsu(r))
                .finally(() => {
                  setShares('')
                })
            }}
          >
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Award ID</label>
                <Input value={awardId} onChange={(e) => setAwardId(e.target.value)} placeholder="Enter award ID" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Symbol</label>
                <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter symbol" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Grant date (yyyy-mm-dd)</label>
                <Input
                  value={grantDate}
                  onChange={(e) =>
                    setGrantDate(e.target.value.trim().replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$3-$1-$2'))
                  }
                  placeholder="Enter grant date"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Number of shares</label>
                <Input
                  value={numShares}
                  onChange={(e) => setNumShares(e.target.value)}
                  placeholder="Enter number of shares"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium">
                Shares: Paste in format Vest date THEN # of shares. Note that m/d/y dates will be converted to yyyy-mm-dd
                format.
              </label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={10}
                onChange={(e) =>
                  setShares(
                    e.currentTarget.value.replace(/\t\r?\n/g, '\t').replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$3-$1-$2'),
                  )
                }
                value={shares}
              />
            </div>

            <Table className="mb-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Vest date</TableHead>
                  <TableHead>Granted on</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Grant ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rowsToImport.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.vest_date}</TableCell>
                    <TableCell>{r.grant_date}</TableCell>
                    <TableCell>{r.share_count?.toString()}</TableCell>
                    <TableCell>{r.award_id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button type="submit">Import grants & vests</Button>
          </form>
        </div>
      </Card>
    </Container>
  )
}
