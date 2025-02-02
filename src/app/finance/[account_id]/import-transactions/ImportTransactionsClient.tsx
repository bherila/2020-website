'use client'
import { useState } from 'react'
import ImportTransactions from './ImportTransactions'
import { fetchWrapper } from '@/lib/fetchWrapper'
import AccountNavigation from '../AccountNavigation'
import Container from '@/components/container'
import { AccountLineItemSchema } from '@/lib/AccountLineItem'
import { z } from 'zod'

export default function ImportTransactionsClient({ id, accountName }: { id: number; accountName: string }) {
  const [loading, setLoading] = useState(false)

  return (
    <Container fluid className="px-4">
      <AccountNavigation accountId={id} accountName={accountName} activeTab="import" />
      <p className="text-sm my-4">
        You can paste or drag/drop: CSV from bank/brokerage, QFX (limited), or HAR (Wealthfront)
      </p>
      <ImportTransactions
        onImportClick={(data) => {
          z.array(AccountLineItemSchema).parse(data)
          setLoading(true)
          fetchWrapper.post(`/api/finance/${id}/line_items`, data).then(() => {
            setLoading(false)
            window.location.href = `/finance/${id}`
          })
        }}
      />
    </Container>
  )
}
