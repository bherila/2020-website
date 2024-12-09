'use client'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { parseDate } from '@/lib/DateHelper'
import { ParsedSPGP } from '@/app/spgp/SPGPSchema'
import { Alert } from 'react-bootstrap'

const NewSPGPRequestForm = ({
  passTypes,
  refetch,
  defaultEmail,
}: {
  passTypes: ParsedSPGPPassType[]
  refetch: () => void
  defaultEmail: string
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(defaultEmail)
  const [birthDate, setBirthDate] = useState('')
  const [passType, setPassType] = useState(0)
  const [previousPassId, setPreviousPassId] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetchWrapper
      .post('/api/spgp/', {
        renewOrNew: !previousPassId ? 'new' : 'renew',
        first: firstName,
        last: lastName,
        birthday: birthDate,
        email: email,
        notes: previousPassId,
        passType: passType.toString(),
      } as ParsedSPGP)
      .then(() => refetch())
  }

  const info = passTypes.filter((pt) => pt.passtype_id === passType)[0]

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" as={Col} controlId="firstName">
        <Form.Label>First name of pass holder (must match photo ID):</Form.Label>
        <Form.Control type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="lastName">
        <Form.Label>Last name of pass holder (must match photo ID):</Form.Label>
        <Form.Control type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email of pass holder online account. Can use the same email for multiple passes.</Form.Label>
        <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="birthDate">
        <Form.Label>Birth date of pass holder:</Form.Label>
        <Form.Control
          type="text"
          required
          pattern="^\d{4}-\d{2}-\d{2}$"
          title="Birth date should be in year-month-day format with 4 digit year, 2 digit month and 2 digit day"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="yyyy-mm-dd"
          onBlur={() => setBirthDate(parseDate(birthDate)?.formatYMD() ?? birthDate)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passType">
        <Form.Label>Pass type you are requesting for the upcoming season</Form.Label>
        <Form.Control as="select" required value={passType} onChange={(e) => setPassType(parseInt(e.target.value))}>
          <option value="">Select Pass Type</option>
          {passTypes.map((pt) => {
            return (
              <option key={pt.passtype_id} value={pt.passtype_id}>
                {pt.display_name}
              </option>
            )
          })}
        </Form.Control>
      </Form.Group>

      {info && (
        <Alert className="mb-3">
          <p>{info.info}</p>
          <p>
            <b>Request by {info.expiry}</b>
          </p>
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="previousPassId">
        <Form.Label>
          Previous pass ID (starts with letter I). Does not have to be the same type as the pass you are requesting for
          upcoming season.
        </Form.Label>
        <Form.Control
          type="text"
          value={previousPassId}
          pattern="^(I900\d*|)$"
          placeholder="Provide your pass ID if renewing"
          title="Input must be empty or start with 'I900' followed by digits"
          onChange={(e) => setPreviousPassId(e.target.value.toUpperCase())}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default NewSPGPRequestForm
