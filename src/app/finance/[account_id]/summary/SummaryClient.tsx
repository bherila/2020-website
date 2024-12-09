'use client'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Masonry from 'react-responsive-masonry'
import './summary.css'
import currency from 'currency.js'

interface Props {
  totals: {
    total_volume: number
    total_commission: number
    total_fee: number
  }
  symbolSummary: {
    t_symbol: string
    total_amount: number
  }[]
  monthSummary: {
    month: string
    total_amount: number
  }[]
}

export default function SummaryClient({ totals, symbolSummary, monthSummary }: Props) {
  return (
    <Masonry columnsCount={3} gutter="16px">
      <Card className="mb-4">
        <Card.Header>
          <h3 className="mb-0">Account Totals</h3>
        </Card.Header>
        <Card.Body>
          <Table bordered size="sm">
            <tbody>
              <tr>
                <td>Total Volume</td>
                <td className="text-end">{currency(totals.total_volume).format()}</td>
              </tr>
              <tr>
                <td>Total Commissions</td>
                <td className="text-end">{currency(totals.total_commission).format()}</td>
              </tr>
              <tr>
                <td>Total Fees</td>
                <td className="text-end">{currency(totals.total_fee).format()}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h3 className="mb-0">By Symbol</h3>
        </Card.Header>
        <Card.Body>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Symbol</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {symbolSummary.map(({ t_symbol, total_amount }) => (
                <tr key={t_symbol}>
                  <td>{t_symbol}</td>
                  <td className="text-end">{currency(total_amount).format()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h3 className="mb-0">By Month</h3>
        </Card.Header>
        <Card.Body>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Month</th>
                <th className="text-end">Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthSummary.map(({ month, total_amount }) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td className="text-end">{currency(total_amount).format()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Masonry>
  )
}
