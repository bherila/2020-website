'use client'
import { useState } from 'react'
import ImportTransactions from './ImportTransactions'
import { fetchWrapper } from '@/lib/fetchWrapper'
import AccountNavigation from '../AccountNavigation'
import Container from '@/components/container'

export default function ImportTransactionsClient({ id, accountName }: { id: number; accountName: string }) {
  const [loading, setLoading] = useState(false)

  const handleImport = async (data: AccountLineItem[]) => {
    setLoading(true)
    try {
      await fetchWrapper.post(`/api/finance/${id}/line_items`, data)
      window.location.href = `/finance/${id}`
    } catch (error) {
      console.error('Import failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid>
      <AccountNavigation accountId={id} accountName={accountName} activeTab="import" />
      <p>Paste as tab separated (like from Excel or Google Sheet)</p>
      <ImportTransactions onImportClick={handleImport} />
    </Container>
  )
}
