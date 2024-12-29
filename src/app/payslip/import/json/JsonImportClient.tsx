'use client'
import { useState } from 'react'
import { fin_payslip_schema } from '@/app/payslip/payslipDbCols'
import { Button } from 'react-bootstrap'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'
import { useRouter } from 'next/navigation'
import styles from '../../dropzone.module.css'

export default function JsonImportClient() {
  const [jsonContent, setJsonContent] = useState('')
  const [previewData, setPreviewData] = useState<any[]>([])
  const router = useRouter()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonContent(e.target.value)
    try {
      const parsed = parseEntities(e.target.value)
      // Validate against schema
      fin_payslip_schema.parse(parsed)
      setPreviewData([parsed])
    } catch (error) {
      console.error('Failed to parse or validate JSON:', error)
      setPreviewData([])
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonContent(content)
        try {
          const parsed = parseEntities(content)
          // Validate against schema
          fin_payslip_schema.parse(parsed)
          setPreviewData([parsed])
        } catch (error) {
          console.error('Failed to parse or validate JSON:', error)
          setPreviewData([])
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = async () => {
    const fd = new FormData()
    fd.append('parsed_json', JSON.stringify(previewData))
    await fetch('/api/payslip/', {
      method: 'POST',
      body: fd,
      credentials: 'include',
    })
    router.push('/payslip')
  }

  return (
    <div>
      <textarea
        className={styles.uploadZone}
        style={{ width: '100%', height: '200px', marginBottom: '20px' }}
        value={jsonContent}
        onChange={handleTextChange}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        placeholder="Paste JSON here or drop a JSON file"
      />

      {previewData.length > 0 && (
        <div>
          <h4>Preview</h4>
          <PayslipTable
            data={previewData}
            cols={[
              { field: 'period_start', title: 'Period Start', hide: false },
              { field: 'period_end', title: 'Period End', hide: false },
              { field: 'pay_date', title: 'Pay Date', hide: false },
              { field: 'earnings_gross', title: 'Gross', hide: false },
              { field: 'earnings_net_pay', title: 'Net', hide: false },
            ]}
          />
          <Button onClick={handleSubmit} className="mt-3">
            Import
          </Button>
        </div>
      )}
    </div>
  )
}
