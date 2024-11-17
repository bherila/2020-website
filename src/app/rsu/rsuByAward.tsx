import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import Table from 'react-bootstrap/Table'
import currency from 'currency.js'

export function RsuByAward(props: { rsu: IAward[] }) {
  const { rsu } = props
  const grouped = _.groupBy(rsu, (r) => r.award_id)
  const now = new Date().toISOString().slice(0, 10)
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Grant ID</th>
          <th>Shares</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(grouped).map((k, i) => {
          const lRSU = grouped[k]
          const minDate = _.min(lRSU.map((x) => x.vest_date))
          const maxDate = _.max(lRSU.map((x) => x.vest_date))
          let totalVested = currency(0)
          let total = currency(0)
          for (const share of lRSU) {
            total = total.add(share.share_count!)
            if (share.vest_date! < now) {
              totalVested = totalVested.add(share.share_count!)
            }
          }

          return (
            <tr key={i}>
              <td>
                {k}
                <br />
                <small>
                  {minDate} to {maxDate}
                </small>
              </td>
              <td>
                <span style={{ textDecoration: 'line-through' }}>{totalVested.value}</span>/{total.value}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
