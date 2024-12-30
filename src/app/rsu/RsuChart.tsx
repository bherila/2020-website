'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { IAward } from '@/app/rsu/IAward'
import _ from 'lodash'
import currency from 'currency.js'

const colors = ['#D32F2F', '#FF8F00', '#FFD600', '#388E3C', '#1976D2', '#7B1FA2']

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

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dataSource}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
        <XAxis dataKey="vest_date" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#222222',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
          }}
          wrapperStyle={{
            backgroundColor: '#333333',
          }}
        />
        <Legend />
        {Array.from(award_ids).map((award_id, index) => {
          const color = colors[index % colors.length]
          return <Bar key={award_id} dataKey={award_id} stackId="a" fill={color} />
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}
