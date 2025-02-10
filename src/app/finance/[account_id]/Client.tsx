'use client'
import { useEffect, useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import TransactionsTable from './TransactionsTable'
import { AccountLineItem } from '@/lib/AccountLineItem'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AccountClient({ id }: { id: number }) {
  const [data, setData] = useState<AccountLineItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchWrapper.get(`/api/finance/${id}/line_items/`)
        setData(fetchedData.filter(Boolean))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching transactions:', error)
        setData([])
        setIsLoading(false)
      }
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

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-8 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">No Transactions Found</h2>
        <p className="mb-6">This account doesn't have any transactions yet.</p>
        <Link href={`/finance/${id}/import-transactions`}>
          <Button>Import Transactions</Button>
        </Link>
      </div>
    )
  }

  return <TransactionsTable enableTagging data={data} onDeleteTransaction={handleDeleteTransaction} />
}
