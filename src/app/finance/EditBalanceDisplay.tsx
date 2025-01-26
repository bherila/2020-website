'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit } from 'lucide-react'
import { useState } from 'react'
import currency from 'currency.js'
import { updateBalance } from './finAccount.updateBalance.action'

export default function EditBalanceDisplay({ acct_id, defaultBalance }: { acct_id: number; defaultBalance: string }) {
  const [balance, setBalance] = useState(defaultBalance)
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setBalance(currency(balance).toString())
      setIsSubmitting(true)
      await updateBalance(acct_id, balance)
      setIsSubmitting(false)
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setBalance(defaultBalance)
      setIsEditing(false)
    }
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <Input
            type="text"
            className="w-60 text-right"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            onKeyPress={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      ) : (
        <div>
          {balance}{' '}
          <Button onClick={() => setIsEditing(true)} variant="ghost">
            <Edit className="cursor-pointer" />
          </Button>
        </div>
      )}
    </div>
  )
}
