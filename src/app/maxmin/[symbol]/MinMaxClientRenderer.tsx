'use client'
import { DataTable } from '@/components/ui/data-table'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import currency from 'currency.js'
import AlphaVantageEarnings from '@/lib/AlphaVantageEarnings'
import StockQuote from '@/lib/StockQuote'
import { StockQuoteExtended } from '@/lib/StockQuoteExtended'
import { DetailChart } from '@/app/maxmin/[symbol]/DetailChart'
import Container from '@/components/container'

interface Props {
  symbol: string
  quotes: StockQuote[]
  earnings: AlphaVantageEarnings
}

export default function MinMaxClientRenderer({ symbol, quotes, earnings }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [onlyNearEarnings, setOnlyNearEarnings] = useState(false)
  const form = useForm({
    defaultValues: {
      stockPrice: 0,
      annualizedImpliedVolatilityPercent: 1.3,
      daysToExpiration: 5,
    },
  })
  const [tableData, setTableData] = useState<StockQuoteExtended[]>([])
  useEffect(() => {
    setTableData(preprocessData(quotes, earnings, onlyNearEarnings))
  }, [quotes, earnings, onlyNearEarnings])
  const inputs = form.getValues()
  const sd1 = inputs.stockPrice * inputs.annualizedImpliedVolatilityPercent * Math.sqrt(inputs.daysToExpiration / 365)
  const outputs = [
    {
      N_SD: 1,
      SD_Value: sd1,
      SD_Percent_Change: sd1 / inputs.stockPrice,
      Min: inputs.stockPrice - sd1,
      Max: inputs.stockPrice + sd1,
      Probability: 0.682,
    },
    {
      N_SD: 2,
      SD_Value: sd1 * 2,
      SD_Percent_Change: (sd1 * 2) / inputs.stockPrice,
      Min: inputs.stockPrice - sd1 * 2,
      Max: inputs.stockPrice + sd1 * 2,
      Probability: 0.954,
    },
    {
      N_SD: 3,
      SD_Value: sd1 * 3,
      SD_Percent_Change: (sd1 * 3) / inputs.stockPrice,
      Min: inputs.stockPrice - sd1 * 3,
      Max: inputs.stockPrice + sd1 * 3,
      Probability: 0.997,
    },
  ]

  if (!tableData || tableData.length == 0) {
    return <div>No tableData, input data = {quotes?.length}</div>
  }

  return (
    <Container fluid className="py-4 flex flex-row">
      <div className="w-1/2">
        <DataTable
          columns={[
            { accessorKey: 'date', header: 'Date' },
            { accessorKey: 'prevClose', header: 'Prev Close' },
            { accessorKey: 'open', header: 'Open' },
            { accessorKey: 'close', header: 'Close' },
            { accessorKey: 'change', header: 'Change' },
            { accessorKey: 'pctChg', header: '% Change' },
            {
              accessorKey: 'nearEarnings',
              header: 'Near Earnings',
              cell: ({ row }) => (row.original.nearEarnings === 0 ? '⭐️' : row.original.nearEarnings),
            },
          ]}
          data={tableData}
          onRowClick={(row) => setSelectedDate(row.date)}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="earnings-switch"
            checked={onlyNearEarnings}
            onCheckedChange={(checked) => setOnlyNearEarnings(checked as boolean)}
          />
          <Label htmlFor="earnings-switch">Only show rows near earnings dates</Label>
        </div>
      </div>
      <div className="w-1/2">
        <h3>Inputs</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
            <FormField
              control={form.control}
              name="stockPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        form.setValue('stockPrice', parseFloat(e.target.value))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualizedImpliedVolatilityPercent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annualized Implied Volatility (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        form.setValue('annualizedImpliedVolatilityPercent', parseFloat(e.target.value))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daysToExpiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days to Expiration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        form.setValue('daysToExpiration', parseFloat(e.target.value))
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" variant="outline">
              Recalculate
            </Button>
          </form>
        </Form>
        <div style={{ paddingTop: '1em' }}>
          <DataTable
            columns={[
              { accessorKey: 'N_SD', header: 'N_SD', cell: ({ row }) => row.original.N_SD.toFixed(2) },
              { accessorKey: 'SD_Value', header: 'SD Value', cell: ({ row }) => `$${row.original.SD_Value.toFixed(2)}` },
              {
                accessorKey: 'SD_Percent_Change',
                header: 'SD % Change',
                cell: ({ row }) => `${(row.original.SD_Percent_Change * 100).toFixed(2)}%`,
              },
              { accessorKey: 'Min', header: 'Min', cell: ({ row }) => `$${row.original.Min.toFixed(2)}` },
              { accessorKey: 'Max', header: 'Max', cell: ({ row }) => `$${row.original.Max.toFixed(2)}` },
              {
                accessorKey: 'Probability',
                header: 'Probability',
                cell: ({ row }) => `${(row.original.Probability * 100).toFixed(1)}%`,
              },
            ]}
            data={outputs}
          />
        </div>
        {selectedDate && tableData ? (
          <>
            <DetailChart data={tableData} centerDate={selectedDate} symbol={symbol} />
            <Button onClick={() => setSelectedDate('')}>Clear selected date</Button>
          </>
        ) : (
          <DetailChart data={tableData} centerDate={selectedDate ?? undefined} symbol={symbol} />
        )}
      </div>
    </Container>
  )
}

function preprocessData(
  quotesInput: StockQuote[],
  earnings: AlphaVantageEarnings,
  onlyNearEarnings: boolean,
): StockQuoteExtended[] {
  if (!quotesInput || !Array.isArray(quotesInput)) {
    return quotesInput
  }

  // upcast & copy
  let quotes = quotesInput.map((r: StockQuote): StockQuoteExtended => ({ ...r }))

  for (let i = 0; i < quotes.length; ++i) {
    const today = quotes[i]
    const yesterday = i > 0 ? quotes[i - 1] : null
    if (yesterday) {
      today.prevClose = currency(yesterday.close)
      today.change = currency(today.open).subtract(currency(yesterday.close))
      today.pctChg = today.change.divide(yesterday.close)
    }
  }

  // flag rows near earnings dates
  if (earnings && Array.isArray(earnings.quarterlyEarnings)) {
    const c = 5
    const earningsDates = earnings.quarterlyEarnings.map((ed) => ed.reportedDate)
    const allDates = quotes.map((td) => td.date) // index maps into tableData
    for (const earningDate of earningsDates) {
      const tableIndex = allDates.indexOf(earningDate)
      const startIndex = Math.max(0, tableIndex - c)
      const endIndex = Math.min(tableIndex + c + 1, quotes.length - 1)
      for (let i = startIndex; i <= endIndex; ++i) {
        quotes[i].nearEarnings = i - tableIndex
      }
    }
    if (onlyNearEarnings) {
      quotes = quotes.filter((x) => typeof x.nearEarnings === 'number')
    }
  }

  quotes.sort((a: StockQuoteExtended, b: StockQuoteExtended) => {
    const x = a?.pctChg?.value || 0
    const y = b?.pctChg?.value || 0
    return x - y
  })
  return quotes
}
