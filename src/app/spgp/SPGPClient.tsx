'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import NewSPGPRequestForm from '@/app/spgp/NewSPGPRequestForm'
import ImportCodeListClient from '@/app/spgp/ImportCodeListClient'
import SPGPImportClient from '@/app/spgp/SPGPImportClient'
import { fetchWrapper } from '@/lib/fetchWrapper'
import SpgpRowActions from './SpgpRowActions'
import { Spinner } from '@/components/ui/spinner'
import { ParsedSPGPPassType } from './SPGPPassTypes'
import { SPGPRequestType, SPGPRequestTypeWithPromo } from './SPGPRequestSchema'

export default function SPGPClient({ admin, userEmail }: { admin: boolean; userEmail: string }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()

  const [fetchKey, setFetchKey] = useState(1)
  const refetch = useCallback(() => setFetchKey(fetchKey + 1), [fetchKey])
  useEffect(() => {
    setLoading(true)
    fetchWrapper
      .get('/api/spgp/')
      .then(setData)
      .finally(() => {
        setLoading(false)
        setAdding(false)
      })
  }, [fetchKey])

  const passTypes: ParsedSPGPPassType[] = data?.passTypes ?? []

  const [limit, setLimit] = useState(25)

  const requests: SPGPRequestType[] = data?.requests

  const [isAdding, setAdding] = useState(false)

  const DEFAULT_TAB = 'view-requests'
  const [selectedTab, handleTabSelect] = useState(DEFAULT_TAB)

  const [search, setSearch] = useState('')
  const filtered = !search ? requests : requests.filter((r) => JSON.stringify(r).indexOf(search) !== -1)

  return (
    <div className="space-y-4">
      <h1>Ski pass group purchase</h1>
      <Button onClick={() => setAdding(true)}>Add another request</Button>

      <Alert>
        <AlertDescription>Please keep in mind this offer is to be kept in private communication...</AlertDescription>
      </Alert>

      <Dialog open={!loading && (isAdding || !requests?.length)} onOpenChange={() => setAdding(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a coupon code</DialogTitle>
          </DialogHeader>
          <NewSPGPRequestForm passTypes={passTypes} refetch={refetch} defaultEmail={userEmail} />
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="view-requests">
        <TabsList>
          <TabsTrigger value="view-requests">View Requests</TabsTrigger>
          {admin && <TabsTrigger value="import-codes">Import Codes</TabsTrigger>}
          {admin && <TabsTrigger value="import-csv">Import Sheet</TabsTrigger>}
        </TabsList>

        <TabsContent value="view-requests">
          {requests?.length && (
            <div className="mb-3">
              You can withdraw a request if the promo code is not assigned yet. Duplicate requests would be merged
              automatically. One promo code per person. Make sure the pass holder name and birthday is correct! You must use
              the promo code BEFORE you purchase the pass! Discount cannot be applied afterward.
            </div>
          )}
          {admin && (
            <Input type="text" placeholder="search" value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
          )}
          {search.length > 0 && (
            <Button variant="secondary" onClick={() => setSearch('')}>
              Clear
            </Button>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                {admin && <TableCell>#</TableCell>}
                <TableCell>Promo code</TableCell>
                {admin && <TableCell>Renew or New</TableCell>}
                <TableCell>First</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Pass Type</TableCell>
                <TableCell>Pass ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            {!loading && (
              <TableBody>
                {filtered.map((request: SPGPRequestTypeWithPromo, i) => {
                  if (i > limit) {
                    return null
                  }
                  return (
                    <TableRow
                      key={request.r_id}
                      style={!!request.r_used_on ? { textDecoration: 'line-through', opacity: 0.5 } : {}}
                    >
                      {admin && <TableCell>{request.r_id}</TableCell>}
                      <TableCell>{request.r_promo ?? (admin ? '' : 'requested!')}</TableCell>
                      {admin && (
                        <TableCell>{request.r_comment && request.r_comment.startsWith('I900') ? 'Renew' : 'New'}</TableCell>
                      )}
                      <TableCell>{request.r_first}</TableCell>
                      <TableCell>{request.r_last}</TableCell>
                      <TableCell>{request.r_birthdate.toString().slice(0, 10)}</TableCell>
                      <TableCell>{request.r_email}</TableCell>
                      <TableCell>{request.passtype_display_name ?? '?'}</TableCell>
                      <TableCell>
                        {request.r_previous_passid} {request.r_comment}
                      </TableCell>
                      <TableCell>
                        <SpgpRowActions data={data} request={request} setData={setData} requests={requests} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
            {filtered?.length > limit && (
              <tfoot>
                <tr>
                  <th colSpan={100}>
                    <Button size="sm" variant="ghost" type="button" onClick={() => setLimit(Number.MAX_SAFE_INTEGER)}>
                      Show all ({filtered?.length})
                    </Button>
                  </th>
                </tr>
              </tfoot>
            )}
          </Table>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spinner className="my-3" />
            </div>
          )}
        </TabsContent>

        {admin && (
          <TabsContent value="import-codes">
            <ImportCodeListClient passTypes={passTypes} />
          </TabsContent>
        )}

        {admin && (
          <TabsContent value="import-csv">
            <Card>
              <CardHeader>Import CSV</CardHeader>
              <CardContent>
                <SPGPImportClient passTypes={passTypes} />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
