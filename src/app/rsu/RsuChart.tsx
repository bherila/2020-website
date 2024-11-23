'use client'
import { Chart, Series, ArgumentAxis, CommonSeriesSettings, Export, Legend, Margin } from 'devextreme-react/chart'
import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import currency from 'currency.js'

export default function RsuChart({ rsu }: { rsu: IAward[] }) {
  const award_ids = new Set<string>()
  const vests = _.groupBy(rsu, 'vest_date')
  const dataSource = []
  for (const vestDate of Object.keys(vests)) {
    let o: { [key: string]: string | number } = { vest_date: vestDate }
    for (const vest of vests[vestDate]) {
      o[vest.award_id!] = currency(vest.share_count!).value
      award_ids.add(vest.award_id!)
    }
    dataSource.push(o)
  }
  console.log(dataSource)
  return (
    <Chart palette="dark" title="Shares vesting over time" dataSource={dataSource}>
      <CommonSeriesSettings argumentField="vest_date" type="stackedBar" />
      {Array.from(award_ids).map((award_id) => (
        <Series key={award_id} valueField={award_id} name={award_id} />
      ))}
      <Margin bottom={20} />
      <ArgumentAxis valueMarginsEnabled={false} />
      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      <Export enabled={true} />
    </Chart>
  )
}
