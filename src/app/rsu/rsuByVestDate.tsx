import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import Table from 'react-bootstrap/Table'
import { vestStyle } from '@/app/rsu/vestStyle'
import currency from 'currency.js'

export function RsuByVestDate(props: { rsu: IAward[] }) {
  const { rsu } = props
  const grouped = _.groupBy(rsu, (r) => r.vest_date)
  const now = new Date().toISOString().slice(0, 10)
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Vest date</th>
          <th>Shares</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(grouped).map((k, i) => {
          const lRSU = grouped[k]
          const vested = k < now
          const total = lRSU.reduce((p, c) => p.add(c.share_count!), currency(0))
          return (
            <tr key={i} style={vested ? vestStyle : {}}>
              <td>
                {vested && '✔ '}
                {k}
              </td>
              <td>{total.value}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
