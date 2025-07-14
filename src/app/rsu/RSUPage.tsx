'use client'
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { IAward } from '@/app/rsu/IAward'
import { RsuByVestDate } from '@/app/rsu/rsuByVestDate'
import { RsuByAward } from '@/app/rsu/rsuByAward'
import dynamic from 'next/dynamic'
import Container from '@/components/container'
import RsuSubNav from '@/app/rsu/components/RsuSubNav'

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
      <RsuSubNav />

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
    </Container>
  )
}
