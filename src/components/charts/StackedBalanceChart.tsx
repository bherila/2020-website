'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import currency from 'currency.js'
import { format } from 'date-fns'

const colors = [
  // Reds
  '#D32F2F', '#C62828', '#B71C1C',
  // Oranges
  '#FF8F00', '#F57C00', '#EF6C00',
  // Yellows
  '#FFD600', '#FFC107', '#FFA000',
  // Greens  
  '#388E3C', '#2E7D32', '#1B5E20',
  // Blues
  '#1976D2', '#1565C0', '#0D47A1',
  // Purples
  '#7B1FA2', '#6A1B9A', '#4A148C',
  // Teals
  '#00796B', '#00695C', '#004D40',
  // Pinks
  '#C2185B', '#AD1457', '#880E4F'
]

interface StackedBalanceChartProps {
  // Array of [date, balance1, balance2, ...] arrays
  data: (string | number)[][]
  // Optional labels for each balance column
  labels?: string[]
}

export default function StackedBalanceChart({ data, labels }: StackedBalanceChartProps) {
  // Transform the data into the format recharts expects
  const chartData = data.map(([date, ...balances]) => {
    const dataPoint: { [key: string]: any } = {
      date: date,
    }
    
    balances.forEach((balance, index) => {
      const label = labels?.[index] || `balance${index + 1}`
      dataPoint[label] = typeof balance === 'string' ? currency(balance).value : balance
    })
    
    return dataPoint
  })

  // Generate the balance keys (excluding the date column)
  const balanceKeys = labels || Array.from({ length: data[0].length - 1 }, (_, i) => `balance${i + 1}`)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
        <XAxis 
          dataKey="date"
          tickFormatter={(date: string) => {
            if (date.includes('Q')) {
              const [year, quarter] = date.split('-')
              return `${quarter} ${year}`
            }
            return format(new Date(date), "MMM 'yy")
          }}
        />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#222222',
            border: 'none',
            borderRadius: '4px',
            color: '#ffffff',
          }}
          formatter={(value: number) => currency(value).format()}
          labelFormatter={(date: string) => {
            if (date.includes('Q')) {
              const [year, quarter] = date.split('-')
              return `${quarter} ${year}`
            }
            return format(new Date(date), "MMM 'yy")
          }}
        />
        {balanceKeys.map((key, index) => {
          const color = colors[index % colors.length]
          return <Bar key={key} dataKey={key} stackId="a" fill={color} />
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}
