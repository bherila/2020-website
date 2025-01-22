'use client'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import { useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { parseDate } from '@/lib/DateHelper'
import { ParsedSPGP } from '@/app/spgp/SPGPSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

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

  const handleSubmit = (e: React.FormEvent) => {
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

  const info = passTypes.find((pt) => pt.passtype_id === passType)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request a Coupon Code</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>First name of pass holder (must match photo ID):</Label>
            <Input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Last name of pass holder (must match photo ID):</Label>
            <Input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Email of pass holder online account:</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Birth date of pass holder:</Label>
            <Input
              type="text"
              required
              pattern="^\d{4}-\d{2}-\d{2}$"
              title="Birth date should be in year-month-day format with 4 digit year, 2 digit month and 2 digit day"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="yyyy-mm-dd"
              onBlur={() => setBirthDate(parseDate(birthDate)?.formatYMD() ?? birthDate)}
            />
          </div>

          <div className="space-y-2">
            <Label>Pass type for upcoming season:</Label>
            <select
              required
              value={passType}
              onChange={(e) => setPassType(parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Pass Type</option>
              {passTypes.map((pt) => (
                <option key={pt.passtype_id} value={pt.passtype_id}>
                  {pt.display_name}
                </option>
              ))}
            </select>
          </div>

          {info && (
            <Alert>
              <AlertDescription>
                <p>{info.info}</p>
                <p className="font-bold">Request by {info.expiry}</p>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Previous pass ID (starts with I900):</Label>
            <Input
              type="text"
              value={previousPassId}
              pattern="^(I900\d*|)$"
              placeholder="Provide your pass ID if renewing"
              title="Input must be empty or start with 'I900' followed by digits"
              onChange={(e) => setPreviousPassId(e.target.value.toUpperCase())}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewSPGPRequestForm
