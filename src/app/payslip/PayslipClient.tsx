'use client'
import { fin_payslip } from '@/app/payslip/payslipDbCols'
import { useCallback, useEffect, useState } from 'react'
import { fetchWrapper } from '@/lib/fetchWrapper'
import { redirect } from 'next/navigation'
import AuthRoutes from '@/app/auth/AuthRoutes'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import { payslip_table_col, PayslipTable } from '@/app/payslip/PayslipTable'
import Spinner from 'react-bootstrap/Spinner'
import FileUploadClient from '@/app/payslip/FileUploadClient'
import { Button } from 'react-bootstrap'
import styles from './dropzone.module.css'
import currency from 'currency.js'
import Table from 'react-bootstrap/Table'
import { genBrackets } from '@/lib/taxBracket'
import { sum } from '@/components/matcher'

export default function PayslipClient(): React.ReactElement {
  const cols: payslip_table_col[] = [
    { field: 'period_start', title: 'Period Start', hide: false },
    { field: 'period_end', title: 'Period End', hide: false },
    { field: 'pay_date', title: 'Pay Date', hide: false },
    { field: 'ps_comment', title: 'Comment', hide: false },
    {
      field: [
        { field: 'ps_salary', title: '' },
        { field: 'earnings_bonus', title: 'Bonus' },
        { field: 'earnings_rsu', title: 'RSU' },
      ],
      title: 'Wages',
      hide: false,
    },
    {
      field: [
        { field: 'imp_ltd', title: 'LTD' },
        { field: 'imp_legal', title: 'Legal' },
        { field: 'imp_fitness', title: 'Gym' },
        { field: 'ps_vacation_payout', title: 'Vacation Payout' },
        { field: 'imp_other', title: 'Misc' },
      ],
      title: 'Supplemental Wages',
      hide: false,
    },
    { field: 'ps_oasdi', title: 'OASDI', hide: false },
    { field: 'ps_medicare', title: 'Medicare', hide: false },
    {
      field: [
        { field: 'ps_fed_tax', title: '', hide: false },
        { field: 'ps_fed_tax_addl', title: '+', hide: false },
        { field: 'ps_fed_tax_refunded', title: 'Refund', hide: false },
      ],
      title: 'Fed Income Tax',
    },
    {
      field: [
        { field: 'ps_state_tax', title: '', hide: false },
        { field: 'ps_state_tax_addl', title: '+', hide: false },
      ],
      title: 'State Tax',
    },
    { field: 'ps_state_disability', title: 'SDI', hide: false },
    {
      field: [
        { field: 'ps_401k_pretax', title: '', hide: false },
        { field: 'ps_401k_employer', title: '+', hide: false },
      ],
      title: '401k Pre-Tax',
    },
    { field: 'ps_401k_aftertax', title: '401k After-Tax', hide: false },
    {
      field: [
        { field: 'ps_pretax_medical', title: 'M' },
        { field: 'ps_pretax_dental', title: 'D' },
        { field: 'ps_pretax_vision', title: 'V' },
      ],
      title: 'Benefits',
    },
    { field: 'ps_payslip_file_hash', title: 'Payslip File Hash', hide: true },
    { field: 'ps_is_estimated', title: 'Is Estimated', hide: false },
    { field: 'earnings_net_pay', title: 'Net Pay' },
    { field: 'other', title: 'Other', hide: false },
  ]

  const [rawData, setRawData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchWrapper
      .get('/api/payslip/')
      .then((res) => {
        setRawData(res)
        setLoading(false)
      })
      .catch(() => {
        redirect(AuthRoutes.signIn)
      })
  }, [])

  const editRow = async (row: fin_payslip) => {
    setLoading(true)
    const fd = new FormData()
    fd.append('parsed_json', JSON.stringify([row]))
    const response = await fetch('/api/payslip/', {
      method: 'POST',
      body: fd,
      credentials: 'include', // Include cookies
    })
    setRawData(await response.json())
    setLoading(false)
  }

  const doImport = async () => {
    setLoading(true)
    const fd = new FormData()
    fd.append('parsed_json', JSON.stringify(previewData))
    const response = await fetch('/api/payslip/', {
      method: 'POST',
      body: fd,
      credentials: 'include', // Include cookies
    })
    setRawData(await response.json())
    setLoading(false)
  }

  const [previewData, setPreviewData] = useState<any[]>([])
  const updateJsonPreview = useCallback((e: any[]) => setPreviewData(e), [])

  // Filter by date
  const data = rawData.filter((r: fin_payslip) => r.pay_date > '2024-01-01' && r.pay_date < '2025-01-01')

  return (
    <Container fluid>
      <div className="container my-2">
        <Row>
          <td>
            Tax period: <b>2024-01-01 through 2024-12-31</b>
          </td>
        </Row>
      </div>
      <Row>
        <PayslipTable data={data} cols={cols} onRowEdited={editRow} />
        {loading && (
          <div className={styles.center}>
            <Spinner />
          </div>
        )}
        <TotalsTable data={data} />
      </Row>
      <Row>
        <FileUploadClient onJsonPreview={updateJsonPreview} />
        {Array.isArray(previewData) && previewData.length > 0 && (
          <>
            <h3>Upload data preview</h3>
            <PayslipTable data={previewData} cols={cols} />
            <Button
              onClick={(e) => {
                e.preventDefault()
                doImport()
              }}
            >
              Import
            </Button>
          </>
        )}
      </Row>
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
      <Table bordered style={{ width: '700px' }}>
        <tbody>
          <tr>
            <td>Estimated W-2 Income</td>
            <td>{income.value.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Pre-tax W-2 Subtractions</td>
            <td>{pretax.value.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard Deduction</td>
            <td>13850.00{/*  //TODO: Standard deduction */}</td>
          </tr>
          <tr>
            <td>Estimated taxable income</td>
            <td>{estTaxIncome.value.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Federal Tax Estimation</td>
            <td>
              <Table bordered size="sm" striped>
                <tbody>
                  {fedBrackets.map((m) => (
                    <tr key={m.bracket.value}>
                      <td>
                        ${m.amt.value} @ {m.bracket.value}
                      </td>
                      <td>{m.tax.value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td>{totalTax.value}</td>
                  </tr>
                </tbody>
              </Table>
            </td>
          </tr>
          <tr>
            <td>Federal Taxes Paid</td>
            <td>
              {fedWH.value.toFixed(2)} ({fedWH.divide(income).multiply(100).value.toFixed(1)}%)
            </td>
          </tr>
          <tr>
            <td>Est Federal Tax Due</td>
            <td>{refund.value.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
