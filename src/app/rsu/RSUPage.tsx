'use client'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import currency from 'currency.js'
import { fetchWrapper } from '@/lib/fetchWrapper'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import MainTitle from '@/components/main-title'
import { IAward } from '@/app/rsu/IAward'
import { RsuByVestDate } from '@/app/rsu/rsuByVestDate'
import { RsuByAward } from '@/app/rsu/rsuByAward'
import { vestStyle } from '@/app/rsu/vestStyle'
import dynamic from 'next/dynamic'

const RsuChartLazy = dynamic(() => import('./RsuChart'), {
  loading: () => <Spinner />,
})

// reused 2x
const header = (
  <thead>
    <tr>
      <th>Vest date</th>
      <th>Granted on</th>
      <th>Shares</th>
      <th>Grant ID</th>
    </tr>
  </thead>
)

export default function RSUPage() {
  const [shares, setShares] = useState<string>('')
  const [numShares, setNumShares] = useState('')
  const [awardId, setAwardId] = useState('')
  const [symbol, setSymbol] = useState('META')
  const [grantDate, setGrantDate] = useState('')

  const rowsToImport: IAward[] = shares
    .split('\n')
    .map((line) => {
      const cols = line
        .split(/\s/)
        .map((r) => r.trim())
        .filter(Boolean)
      if (cols.length !== 2) {
        return {} // skip
      }
      try {
        return {
          award_id: awardId,
          grant_date: grantDate,
          vest_date: cols[0],
          share_count: currency(cols[1]),
          symbol,
        }
      } catch {
        return {}
      }
    })
    .filter((r) => !!r.share_count)

  const [loading, setLoading] = useState(true)
  const [rsu, setRsu] = useState<IAward[]>([])
  useEffect(() => {
    fetchWrapper
      .get('/api/rsu/')
      .then((response) => setRsu(response))
      .catch(
        (e) =>
          (location.href =
            '/auth/sign-in/?e=' + encodeURIComponent(e.toString()) + '&back=' + encodeURIComponent(location.pathname)),
      )
      .finally(() => setLoading(false))
  }, [])

  if (!rsu) {
    return null
  }

  const now = new Date().toISOString().slice(0, 10)
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <MainTitle>RSU App</MainTitle>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <RsuChartLazy rsu={rsu} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>All vests</h3>
          <Table size="sm">
            {header}
            <tbody>
              {rsu.map((r, i) => {
                const vested = r.vest_date! < now
                return (
                  <tr key={i} style={vested ? vestStyle : {}}>
                    <td>
                      {vested && '✔ '}
                      {r.vest_date}
                    </td>
                    <td>{r.grant_date}</td>
                    <td>{r.share_count?.toString()}</td>
                    <td>{r.award_id}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          {loading && (
            <div style={{ textAlign: 'center' }} className="py-4">
              <Spinner />
            </div>
          )}
        </Col>
        <Col md={3}>
          <h3>per vest date</h3>
          <RsuByVestDate rsu={rsu} />
        </Col>
        <Col md={3}>
          <h3>per award</h3>
          <RsuByAward rsu={rsu} />
        </Col>
      </Row>
      <Row>
        <h3>Add an award</h3>
        <p>Duplicate items (based on grant date + award id + vest date + symbol) will not be added</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            fetchWrapper
              .post('/api/rsu/', rowsToImport)
              .then((r) => setRsu(r))
              .finally(() => {
                setShares('')
              })
          }}
        >
          <Row>
            <Form.Check
              type="switch"
              id="award-id-switch"
              label="Award id"
              value={awardId}
              onChange={(e) => setAwardId(e.currentTarget.value)}
            />
          </Row>
          <Row>
            <Form.Check
              type="switch"
              id="symbol-switch"
              label="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.currentTarget.value)}
            />
          </Row>
          <Row>
            <Form.Check
              type="switch"
              id="grant-date-switch"
              label="Grant date yyyy-mm-dd"
              value={grantDate}
              onChange={(e) =>
                setGrantDate(e.currentTarget.value.trim().replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$3-$1-$2'))
              }
            />
          </Row>
          <Row>
            <Form.Check
              type="switch"
              id="shares-switch"
              label="Sanity check # of shares"
              value={numShares}
              onChange={(e) => setNumShares(e.currentTarget.value)}
            />
          </Row>
          <Row>
            <label>
              Shares: Paste in format Vest date THEN # of shares. Note that m/d/y dates will be converted to yyyy-mm-dd
              format.
              <textarea
                onChange={(e) =>
                  setShares(
                    e.currentTarget.value.replace(/\t\r?\n/g, '\t').replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$3-$1-$2'),
                  )
                }
                value={shares}
                rows={20}
                style={{ width: '100%' }}
              />
            </label>
          </Row>
          <Table>
            {header}
            <tbody>
              {rowsToImport.map((r, i) => (
                <tr key={i}>
                  <td>{r.vest_date}</td>
                  <td>{r.grant_date}</td>
                  <td>{r.share_count?.toString()}</td>
                  <td>{r.award_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button type="submit">Import grants & vests</button>
        </form>
      </Row>
    </Container>
  )
}
