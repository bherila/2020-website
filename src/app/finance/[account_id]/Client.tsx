'use client'
import { useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import TransactionsTable from './TransactionsTable'
import { AccountLineItem, AccountLineItemSchema } from '@/lib/AccountLineItem'
import z from 'zod'
import { Spinner } from '@/components/ui/spinner'

export default function AccountClient({ id, rawData }: { id: number; rawData: any }) {
  const [data, setData] = useState<AccountLineItem[]>(z.array(AccountLineItemSchema).parse(rawData))

  const handleDeleteTransaction = async (t_id: string) => {
    try {
      // Optimistic update
      const updatedData = data?.filter((transaction) => transaction.t_id?.toString() !== t_id) || []
      setData(updatedData)

      // Perform server-side deletion
      await fetchWrapper.delete(`/api/finance/${id}/line_items`, { t_id })
    } catch (error) {
      // Revert optimistic update on error
      const refreshedData = await fetchWrapper.get(`/api/finance/${id}/`)
      setData(refreshedData)

      console.error('Delete transaction error:', error)
    }
  }

  return data === null ? (
    <div className="d-flex justify-content-center">
      <Spinner />
    </div>
  ) : (
    <TransactionsTable data={data} onDeleteTransaction={handleDeleteTransaction} />
  )
}
