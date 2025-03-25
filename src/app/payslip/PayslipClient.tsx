'use client'
import { Button } from '@/components/ui/button'
import { fin_payslip } from '@/app/payslip/payslipDbCols'
import { genBrackets } from '@/lib/taxBracket'
import { PlusCircle, FileSpreadsheet } from 'lucide-react'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { sum } from '@/components/matcher'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cols } from '@/app/payslip/config/payslipColumnsConfig'
import Container from '@/components/container'
import currency from 'currency.js'
import Link from 'next/link'
import { savePayslip } from './entry/actions'

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
          <TotalsTable data={data} />
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

function totalSubtractions(data: fin_payslip[]) {
  let tot = currency(0)
  for (const row of data) {
    tot = tot
      .add(row.ps_401k_pretax ?? 0)
      .add(row.ps_pretax_medical ?? 0)
      .add(row.ps_pretax_fsa ?? 0)
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

function totalStateWH(data: fin_payslip[]) {
  let tot = currency(0)
  for (const row of data) {
    tot = tot
      .add(row.ps_state_disability ?? 0)
      .add(row.ps_state_tax ?? 0)
      .subtract(row.ps_state_tax_addl ?? 0)
  }
  return tot
}

function TotalsTable(props: { data: fin_payslip[] }) {
  const income = totalTaxableIncomeBeforeSubtractions(props.data)
  const fedWH = totalFedWH(props.data)
  const pretax = totalSubtractions(props.data)
  const estTaxIncome = income.subtract(pretax).subtract(13850)
  const fedBrackets = genBrackets('2023', estTaxIncome)
  const totalTax = sum(fedBrackets.map((r) => r.tax))
  const refund = totalTax.subtract(fedWH)
  return (
    <div style={{ alignContent: 'center', flexDirection: 'column' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Estimated W-2 Income</TableCell>
            <TableCell>{income.value.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pre-tax W-2 Subtractions</TableCell>
            <TableCell>{pretax.value.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Standard Deduction</TableCell>
            <TableCell>13850.00{/*  //TODO: Standard deduction */}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Estimated taxable income</TableCell>
            <TableCell>{estTaxIncome.value.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Federal Tax Estimation</TableCell>
            <TableCell>
              <Table>
                <TableBody>
                  {fedBrackets.map((m) => (
                    <TableRow key={m.bracket.value}>
                      <TableCell>
                        ${m.amt.value} @ {m.bracket.value}
                      </TableCell>
                      <TableCell>{m.tax.value}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Total:</TableCell>
                    <TableCell>{totalTax.value}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Federal Taxes Paid</TableCell>
            <TableCell>
              {fedWH.value.toFixed(2)} ({fedWH.divide(income).multiply(100).value.toFixed(1)}%)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Est Federal Tax Due</TableCell>
            <TableCell>{refund.value.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
