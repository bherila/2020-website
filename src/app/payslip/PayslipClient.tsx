'use client'
import { Button } from '@/components/ui/button'
import { fin_payslip } from '@/app/payslip/payslipDbCols'
import { PlusCircle, FileSpreadsheet } from 'lucide-react'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cols } from '@/app/payslip/config/payslipColumnsConfig'
import Container from '@/components/container'
import currency from 'currency.js'
import Link from 'next/link'
import { savePayslip } from './entry/actions'
import { calculateTax } from '@/lib/taxBracket'
import { Badge } from '@/components/ui/badge'

interface PayslipClientProps {
  selectedYear: string
  initialData: fin_payslip[]
  initialYears: string[]
}

export default function PayslipClient({ selectedYear, initialData, initialYears }: PayslipClientProps): React.ReactElement {
  const editRow = async (row: fin_payslip) => {
    await savePayslip(row)
  }

  const data = initialData.filter(
    (r: fin_payslip) => r.pay_date! > `${selectedYear}-01-01` && r.pay_date! < `${selectedYear}-12-31`,
  )

  const dataThroughQ1 = initialData.filter(
    (r: fin_payslip) => r.pay_date! > `${selectedYear}-01-01` && r.pay_date! < `${selectedYear}-04-01`,
  )

  const dataThroughQ2 = initialData.filter(
    (r: fin_payslip) => r.pay_date! > `${selectedYear}-01-01` && r.pay_date! < `${selectedYear}-07-01`,
  )

  const dataThroughQ3 = initialData.filter(
    (r: fin_payslip) => r.pay_date! > `${selectedYear}-01-01` && r.pay_date! < `${selectedYear}-10-01`,
  )

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
      <div className="text-muted-foreground">No payslips found for the selected year</div>
      <Button asChild>
        <Link href="/payslip/entry">
          <PlusCircle className="mr-2" /> Add Payslip
        </Link>
      </Button>
    </div>
  )

  return (
    <Container fluid>
      <div className="w-full my-2">
        <div className="flex justify-between items-center px-4">
          <div className="flex gap-2 items-center">
            <span>Tax Year:</span>
            {initialYears.map((year) => (
              <Button asChild key={year} variant={year === selectedYear ? 'default' : 'outline'}>
                <Link href={`?year=${year}`}>{year}</Link>
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/payslip/entry">
                <PlusCircle className="mr-2" /> Add Payslip
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/payslip/import/json">Import JSON</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/payslip/import/tsv">
                <FileSpreadsheet className="mr-2" /> Import TSV
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-4 mt-2">
          Tax period:{' '}
          <b>
            {selectedYear}-01-01 through {selectedYear}-12-31
          </b>
        </div>
      </div>

      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <PayslipTable data={data} cols={cols} onRowEdited={editRow} />
          <div className="mt-4">
            <TotalsTable
              series={
                [
                  ['Q1', dataThroughQ1],
                  dataThroughQ2.length > dataThroughQ1.length ? ['Q2', dataThroughQ2] : undefined,
                  dataThroughQ3.length > dataThroughQ2.length ? ['Q3', dataThroughQ3] : undefined,
                  data.length > dataThroughQ3.length ? ['Q4 (Full Year)', data] : undefined,
                ].filter(Boolean) as [string, fin_payslip[]][]
              }
            />
          </div>
        </>
      )}
    </Container>
  )
}

function totalTaxableIncomeBeforeSubtractions(data: fin_payslip[]) {
  let tot = currency(0)
  for (const row of data) {
    tot = tot
      .add(row.ps_salary ?? 0)
      .add(row.earnings_rsu ?? 0)
      .add(row.imp_ltd ?? 0)
      .add(row.imp_legal ?? 0)
      .add(row.imp_fitness ?? 0)
      .add(row.imp_other ?? 0)
  }
  return tot
}

function totalFedWH(data: fin_payslip[]) {
  let tot = currency(0)
  for (const row of data) {
    tot = tot
      .add(row.ps_fed_tax ?? 0)
      .add(row.ps_fed_tax_addl ?? 0)
      .subtract(row.ps_fed_tax_refunded ?? 0)
  }
  return tot
}

function TotalsTable({
  series,
  taxConfig = {
    year: '2025',
    state: '',
    filingStatus: 'Single',
    standardDeduction: 13850,
  },
}: {
  series: [string, fin_payslip[]][]
  taxConfig?: {
    year: string
    state: string
    filingStatus: 'Single' | 'Married' | 'Married Filing Separately' | 'Head of Household'
    standardDeduction: number
  }
}) {
  const calculateTotals = (data: fin_payslip[]) => {
    const income = totalTaxableIncomeBeforeSubtractions(data)
    const fedWH = totalFedWH(data)
    const estTaxIncome = income.subtract(taxConfig.standardDeduction)
    const { taxes, totalTax } = calculateTax(taxConfig.year, taxConfig.state, estTaxIncome, taxConfig.filingStatus)

    return { income, fedWH, estTaxIncome, taxes, totalTax }
  }
  const rows = [
    {
      description: 'Estimated Income',
      getValue: (totals: ReturnType<typeof calculateTotals>) => totals.income.value.toFixed(2),
    },
    {
      description: 'Standard Deduction',
      getValue: () => taxConfig.standardDeduction.toFixed(2),
    },
    {
      description: 'Estimated Taxable Income',
      getValue: (totals: ReturnType<typeof calculateTotals>) => totals.estTaxIncome.value.toFixed(2),
    },
    {
      description: 'Tax Breakdown',
      getValue: (totals: ReturnType<typeof calculateTotals>) => (
        <Table>
          <TableBody>
            {totals.taxes.map((m) => (
              <TableRow key={m.bracket.toString()}>
                <TableCell>
                  ${m.amt.value} @ {m.bracket.toString()}
                </TableCell>
                <TableCell>{m.tax.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    },
    {
      description: 'Total Tax',
      getValue: (totals: ReturnType<typeof calculateTotals>) => totals.totalTax.value.toFixed(2),
    },
    {
      description: 'Effective Tax Rate',
      getValue: (totals: ReturnType<typeof calculateTotals>) =>
        totals.estTaxIncome.value > 0
          ? `${totals.totalTax.divide(totals.estTaxIncome).multiply(100).value.toFixed(2)}%`
          : 'N/A',
    },
    {
      description: 'Taxes Withheld',
      getValue: (totals: ReturnType<typeof calculateTotals>) =>
        `${totals.fedWH.value.toFixed(2)} (${totals.fedWH.divide(totals.income).multiply(100).value.toFixed(1)}%)`,
    },
    {
      description: 'Est Tax Due/Refund',
      getValue: (totals: ReturnType<typeof calculateTotals>) => {
        const taxDueOrRefund = totals.totalTax.subtract(totals.fedWH)
        const absValue = Math.abs(taxDueOrRefund.value)

        if (taxDueOrRefund.value < 0) {
          return (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{absValue.toFixed(2)}</Badge>
              <Badge variant="outline" className="text-green-600">
                Refund
              </Badge>
            </div>
          )
        } else if (taxDueOrRefund.value > 0) {
          return (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{absValue.toFixed(2)}</Badge>
              <Badge variant="outline" className="text-red-600">
                Due
              </Badge>
            </div>
          )
        } else {
          return '0.00'
        }
      },
    },
  ]
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          {series.map(([label]) => (
            <TableHead key={label}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.description}</TableCell>
            {series.map(([label, data], seriesIndex) => {
              const t = calculateTotals(data)
              return <TableCell key={label}>{row.getValue(t)}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
