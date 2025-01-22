import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { vestStyle } from '@/app/rsu/vestStyle'
import currency from 'currency.js'

export function RsuByVestDate(props: { rsu: IAward[] }) {
  const { rsu } = props
  const grouped = _.groupBy(rsu, (r) => r.vest_date)
  const now = new Date().toISOString().slice(0, 10)
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeader>Vest date</TableHeader>
          <TableHeader>Shares</TableHeader>
        </tr>
      </TableHead>
      <TableBody>
        {Object.keys(grouped).map((k, i) => {
          const lRSU = grouped[k]
          const vested = k < now
          const total = lRSU.reduce((p, c) => p.add(c.share_count!), currency(0))
          return (
            <TableRow key={i} style={vested ? vestStyle : {}}>
              <TableCell>
                {vested && '✔ '}
                {k}
              </TableCell>
              <TableCell>{total.value}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
