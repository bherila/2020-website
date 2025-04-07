'use client'
import { Button } from '@/components/ui/button'
import { fin_payslip } from '@/app/payslip/payslipDbCols'
import { PlusCircle, FileSpreadsheet } from 'lucide-react'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { cols } from '@/app/payslip/config/payslipColumnsConfig'
import Container from '@/components/container'
import Link from 'next/link'
import { savePayslip } from './entry/actions'
import TotalsTable from './TotalsTable.client'

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
  const dataSeries = [
    ['Q1', dataThroughQ1],
    dataThroughQ2.length > dataThroughQ1.length ? ['Q2', dataThroughQ2] : undefined,
    dataThroughQ3.length > dataThroughQ2.length ? ['Q3', dataThroughQ3] : undefined,
    data.length > dataThroughQ3.length ? ['Q4 (Full Year)', data] : undefined,
  ].filter(Boolean) as [string, fin_payslip[]][]

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
            <h2 className="text-lg font-semibold mx-2 mt-6 mb-2">Federal Taxes</h2>
            <TotalsTable
              series={dataSeries}
              taxConfig={{
                year: selectedYear,
                state: '',
                filingStatus: 'Single',
                standardDeduction: 13850,
              }}
            />
            <h2 className="text-lg font-semibold mx-2 mt-6 mb-2">California State Taxes</h2>
            <TotalsTable
              series={dataSeries}
              taxConfig={{
                year: selectedYear,
                state: 'CA',
                filingStatus: 'Single',
                standardDeduction: 13850,
              }}
            />
          </div>
        </>
      )}
    </Container>
  )
}
