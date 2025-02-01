'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import currency from 'currency.js'
import { format } from 'date-fns'

export default function AccountBalanceHistory({ balanceHistory }: { balanceHistory: [number, string][] }) {
  const data = balanceHistory.map(([date, balance]) => ({
    date: date,
    balance: currency(balance).value,
  }))

  return (
    <>
      {/* <pre>{JSON.stringify(balanceHistory)}</pre> */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
          <XAxis dataKey="date" tickFormatter={(date: Date) => format(new Date(date), 'MMM ’yy')} />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#222222',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
            }}
            formatter={(value: number) => currency(value).format()}
            labelFormatter={(date: number) => format(new Date(date), 'MMM ’yy')}
          />
          <Line type="monotone" dataKey="balance" stroke="#1976D2" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
