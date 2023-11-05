'use client'
import { fin_payslip_col } from '@/app/payslip/payslipDbCols'
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
      title: 'Salary',
      hide: false,
    },
    {
      field: [
        { field: 'imp_ltd', title: 'LTD' },
        { field: 'imp_legal', title: 'Legal' },
        { field: 'imp_fitness', title: 'Gym' },
        { field: 'imp_other', title: 'Misc' },
      ],
      title: 'Imputed Income',
      hide: false,
    },
    { field: 'ps_oasdi', title: 'OASDI', hide: false },
    { field: 'ps_medicare', title: 'Medicare', hide: false },
    {
      field: [
        { field: 'ps_fed_tax', title: 'WH', hide: false },
        { field: 'ps_fed_tax_addl', title: 'Addl', hide: false },
        { field: 'ps_fed_tax_refunded', title: 'Refund', hide: false },
      ],
      title: 'Fed Income Tax',
    },
    {
      field: [
        { field: 'ps_state_tax', title: 'WH', hide: false },
        { field: 'ps_state_tax_addl', title: 'Addl', hide: false },
      ],
      title: 'State Tax',
    },
    { field: 'ps_state_disability', title: 'SDI', hide: false },
    {
      field: [
        { field: 'ps_401k_pretax', title: 'Employee', hide: false },
        { field: 'ps_401k_employer', title: 'Employer', hide: false },
      ],
      title: '401k Pre-Tax',
    },
    { field: 'ps_401k_aftertax', title: '401k After-Tax', hide: false },
    { field: 'ps_payslip_file_hash', title: 'Payslip File Hash', hide: true },
    { field: 'ps_is_estimated', title: 'Is Estimated', hide: false },
    { field: 'other', title: 'Other', hide: false },
  ]

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchWrapper
      .get('/api/payslip/')
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch(() => {
        redirect(AuthRoutes.signIn)
      })
  }, [])

  const [previewData, setPreviewData] = useState<any[]>([])
  const updateJsonPreview = useCallback((e: any[]) => setPreviewData(e), [])
  return (
    <Container fluid>
      <Row>
        <PayslipTable data={data} cols={cols} />
        {loading && (
          <div className={styles.center}>
            <Spinner />
          </div>
        )}
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
                const fd = new FormData()
                fd.append('parsed_json', JSON.stringify(previewData))
                const response = fetch('/api/payslip/', {
                  method: 'POST',
                  body: fd,
                  credentials: 'include', // Include cookies
                })
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
