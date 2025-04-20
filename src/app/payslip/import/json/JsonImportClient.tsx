'use client'
import { useState, useCallback, useMemo } from 'react'
import { fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { Button } from '@/components/ui/button'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'
import { useRouter } from 'next/navigation'
import FileUploadClient from '@/app/payslip/FileUploadClient'
import { Loader2 } from 'lucide-react'

import styles from '../../dropzone.module.css'

export default function JsonImportClient() {
  const [jsonContent, setJsonContent] = useState('')
  const [previewData, setPreviewData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const parseAndValidateJson = useCallback(
    (content: string) => {
      try {
        const parsed = parseEntities(content)
        // Validate against schema
        fin_payslip_schema.parse(parsed || content)
        setPreviewData([parsed])
        setError(null)
        console.log('updated preview data', parsed)
      } catch (error) {
        console.error('Failed to parse or validate JSON:', error)
        setPreviewData([])
        setError(error instanceof Error ? error.message : 'Invalid JSON format')
      }
    },
    [setPreviewData, setError],
  )

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setJsonContent(content)
    parseAndValidateJson(content)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file && file.type === 'application/json') {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setJsonContent(content)
          parseAndValidateJson(content)
        }
        reader.readAsText(file)
      }
    },
    [parseAndValidateJson],
  )

  const handleSubmit = async () => {
    if (previewData.length === 0) {
      setError('No valid data to import')
      return
    }

    setIsLoading(true)
    try {
      const fd = new FormData()
      fd.append('parsed_json', JSON.stringify(previewData))
      const response = await fetch('/api/payslip/', {
        method: 'POST',
        body: fd,
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to import payslips')
      }

      router.push('/payslip')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const updateJsonPreview = useCallback(
    (rows: any[]) => {
      try {
        const parsedRows = rows.map(parseEntities)
        // Validate against schema
        parsedRows.forEach((row) => fin_payslip_schema.parse(row))
        setPreviewData(parsedRows)
        setError(null)
      } catch (error) {
        console.error('Failed to parse or validate JSON:', error)
        setPreviewData([])
        setError(error instanceof Error ? error.message : 'Invalid JSON format')
      }
    },
    [setPreviewData, setError],
  )

  const previewColumns = useMemo(
    () => [
      { field: 'period_start', title: 'Period Start', hide: false },
      { field: 'period_end', title: 'Period End', hide: false },
      { field: 'pay_date', title: 'Pay Date', hide: false },
      { field: 'earnings_gross', title: 'Gross', hide: false },
      { field: 'earnings_net_pay', title: 'Net', hide: false },
    ],
    [],
  )

  return (
    <div className="d-flex gap-4">
      <div style={{ flex: 3 }}>
        <textarea
          className={styles.uploadZone}
          style={{ width: '100%', height: '200px', marginBottom: '20px' }}
          value={jsonContent}
          onChange={handleTextChange}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          placeholder="Paste JSON here or drop a JSON file"
        />
        {error && <div className="text-danger mb-3">{error}</div>}
        <FileUploadClient onJsonPreview={updateJsonPreview} acceptTypes={['application/json']} />
      </div>
      {previewData.length > 0 && (
        <div>
          <h4>Preview</h4>
          <PayslipTable
            data={previewData}
            // @ts-ignore
            cols={previewColumns}
          />
          <Button onClick={handleSubmit} className="mt-3" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              'Import'
            )}
          </Button>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h5>Example JSON</h5>
        <pre style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
          {`{
  "period_start": "2024-01-01",
  "period_end": "2024-01-15",
  "pay_date": "2024-01-15",
  "ps_salary": 5000.00,
  "earnings_bonus": 1000.00,
  "earnings_rsu": 2000.00,
  "ps_oasdi": 310.00,
  "ps_medicare": 72.50,
  "ps_fed_tax": 800.00,
  "ps_state_tax": 300.00,
  "ps_state_disability": 50.00,
  "ps_401k_pretax": 500.00,
  "ps_pretax_medical": 100.00,
  "ps_pretax_dental": 50.00,
  "ps_pretax_vision": 25.00,
  "earnings_net_pay": 5892.50
}`}
        </pre>
        <h5 className="mt-3">Field Descriptions</h5>
        <p>Dates are in the format YYYY-MM-DD</p>
        <ul style={{ fontSize: '0.8rem' }}>
          <li>
            <b>period_start</b>: Start date of pay period
          </li>
          <li>
            <b>period_end</b>: End date of pay period
          </li>
          <li>
            <b>pay_date</b>: Date paycheck was issued
          </li>
          <li>
            <b>ps_salary</b>: Base salary amount
          </li>
          <li>
            <b>earnings_bonus</b>: Bonus payment amount
          </li>
          <li>
            <b>earnings_rsu</b>: Restricted stock units value
          </li>
          <li>
            <b>ps_oasdi</b>: Social Security tax
          </li>
          <li>
            <b>ps_medicare</b>: Medicare tax
          </li>
          <li>
            <b>ps_fed_tax</b>: Federal income tax
          </li>
          <li>
            <b>ps_state_tax</b>: State income tax
          </li>
          <li>
            <b>ps_state_disability</b>: State disability insurance
          </li>
          <li>
            <b>ps_401k_pretax</b>: 401k pre-tax contribution
          </li>
          <li>
            <b>ps_pretax_medical</b>: Medical insurance premium
          </li>
          <li>
            <b>ps_pretax_dental</b>: Dental insurance premium
          </li>
          <li>
            <b>ps_pretax_vision</b>: Vision insurance premium
          </li>
          <li>
            <b>earnings_net_pay</b>: Net pay after deductions
          </li>
          <li>
            <b>ps_fed_tax_addl</b>: Additional federal tax withholding
          </li>
          <li>
            <b>ps_state_tax_addl</b>: Additional state tax withholding
          </li>
          <li>
            <b>ps_401k_aftertax</b>: 401k after-tax contribution
          </li>
          <li>
            <b>ps_401k_employer</b>: 401k employer match
          </li>
          <li>
            <b>ps_fed_tax_refunded</b>: Refunded federal tax
          </li>
          <li>
            <b>ps_payslip_file_hash</b>: Hash of payslip file
          </li>
          <li>
            <b>ps_is_estimated</b>: Whether payslip is estimated
          </li>
          <li>
            <b>ps_comment</b>: Additional comments
          </li>
          <li>
            <b>ps_vacation_payout</b>: Vacation payout amount
          </li>
          <li>
            <b>ps_pretax_fsa</b>: Flexible spending account contribution
          </li>
          <li>
            <b>other</b>: Miscellaneous other data
          </li>
        </ul>
      </div>
    </div>
  )
}
