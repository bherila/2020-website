'use client'
import { useCallback, useEffect, useState } from 'react'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { fetchWrapper } from '@/lib/fetchWrapper'
import FileUploadClient from '@/app/payslip/FileUploadClient'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { fin_payslip_col } from '@/app/payslip/payslipDbCols'
import { Button } from 'react-bootstrap'

export default function Payslip() {
  const cols: { field: fin_payslip_col; hide?: boolean; title?: string }[] = [
    { field: 'period_start', title: 'Period Start', hide: true },
    { field: 'period_end', title: 'Period End', hide: false },
    { field: 'pay_date', title: 'Pay Date', hide: true },
    { field: 'ps_comment', title: 'Comment', hide: false },
    { field: 'ps_salary', title: 'Salary', hide: false },
    { field: 'ps_bonus', title: 'Bonus', hide: false },
    { field: 'ps_rsu', title: 'RSU', hide: false },
    { field: 'ps_imputed_income', title: 'Imp Income', hide: false },
    { field: 'ps_oasdi', title: 'OASDI', hide: false },
    { field: 'ps_medicare', title: 'Medicare', hide: false },
    { field: 'ps_fed_tax', title: 'Federal Tax', hide: false },
    { field: 'ps_state_tax', title: 'State Tax', hide: false },
    { field: 'ps_state_disability', title: 'State Disability', hide: false },
    { field: 'ps_401k_pretax', title: '401k Pre-Tax', hide: false },
    { field: 'ps_401k_aftertax', title: '401k After-Tax', hide: false },
    { field: 'ps_fed_tax_refunded', title: 'Fed Tax Refunded', hide: false },
    { field: 'ps_payslip_file_hash', title: 'Payslip File Hash', hide: true },
    { field: 'ps_is_estimated', title: 'Is Estimated', hide: false },
    { field: 'other', title: 'Other', hide: false },
  ]

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    fetchWrapper.get('/api/payslip/').then((res) => {
      setData(res)
      setLoading(false)
    })
  }, [])

  const [previewData, setPreviewData] = useState<any[]>([])
  const updateJsonPreview = useCallback((e: any[]) => setPreviewData(e), [])
  return (
    <Container fluid>
      <Row>
        <PayslipTable data={data} cols={cols} />
        {loading && <Spinner />}
      </Row>
      <Row>
        <FileUploadClient onJsonPreview={updateJsonPreview} />
        {updateJsonPreview.length && (
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
