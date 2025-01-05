import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import currency from 'currency.js'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function RsuByAward(props: { rsu: IAward[] }) {
  const { rsu } = props
  const grouped = _.groupBy(rsu, (r) => r.award_id)
  const now = new Date().toISOString().slice(0, 10)
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Grant ID</TableHeader>
          <TableHeader>Shares</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
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
            <TableRow key={i}>
              <TableCell>
                {k}
                <br />
                <small>
                  {minDate} to {maxDate}
                </small>
              </TableCell>
              <TableCell>
                <span style={{ textDecoration: 'line-through' }}>{totalVested.value}</span>/{total.value}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
