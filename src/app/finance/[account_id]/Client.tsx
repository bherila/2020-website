'use client'
import { useEffect, useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import TransactionsTable from './TransactionsTable'
import { AccountLineItem } from '@/lib/AccountLineItem'
import { Spinner } from '@/components/ui/spinner'

export default function AccountClient({ id }: { id: number }) {
  const [data, setData] = useState<AccountLineItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWrapper.get(`/api/finance/${id}/line_items/`)
      setData(data.filter(Boolean))
    }
    fetchData()
  }, [id])

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

  return data === null || data.length === 0 ? (
    <div className="d-flex justify-content-center">
      <Spinner />
    </div>
  ) : (
    <TransactionsTable data={data} onDeleteTransaction={handleDeleteTransaction} />
  )
}
