'use client'
import React, { useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { AccountTableRow } from '@/app/api/account/model'
import Alert from 'react-bootstrap/Alert'
import { useRouter } from 'next/navigation'

const NewAccountForm = () => {
  const [acctName, setAcctName] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()

    const formData = {
      acct_name: acctName,
    }

    fetchWrapper
      .post('/api/account/', formData)
      .then((response: AccountTableRow[]) => {
        if (Array.isArray(response)) {
          // Handle a successful response, e.g., redirect to another page or show a success message.
          const id = response.find((n) => n.acct_name === acctName)?.acct_id
          if (id) {
            location.href = `/accounts/${id}/`
          }
        } else {
          // Handle errors, e.g., display an error message to the user.
          setErr(JSON.stringify(response))
        }
      })
      .catch((error) => {
        // Handle network or other errors.
        setErr(error.toString())
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {err && <Alert color="danger">{err}</Alert>}
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

      <button type="submit" className="btn btn-primary">
        Create Account
      </button>
    </form>
  )
}

export default NewAccountForm
