'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type NewAccountFormProps = {
  createAccount: (acctName: string) => Promise<void>
}

const NewAccountForm = (props: NewAccountFormProps) => {
  const [acctName, setAcctName] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErr('')
    try {
      await props.createAccount(acctName)
    } catch (error) {
      setErr(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="acctName" className="form-label">
          Account Name
        </label>
        <input
          type="text"
          className="form-control"
          id="acctName"
          value={acctName}
          onChange={(e) => setAcctName(e.target.value)}
        />
      </div>

      {err && <p style={{ color: 'red' }}>{err}</p>}
      <button type="submit" className="btn btn-primary">
        Create Account
      </button>
    </form>
  )
}

export default NewAccountForm
