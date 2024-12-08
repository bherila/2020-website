'use client'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { fetchWrapper } from '@/lib/fetchWrapper'
import TransactionsTable from './TransactionsTable'
import { AccountLineItem } from '@/lib/AccountLineItem'

export default function AccountClient({ id }: { id: number }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AccountLineItem[] | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchWrapper.get(`/api/finance/${id}/line_items`).then((res) => {
      setData(res)
      setLoading(false)
    })
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

  return loading || data === null ? (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <TransactionsTable data={data} onDeleteTransaction={handleDeleteTransaction} />
  )
}
