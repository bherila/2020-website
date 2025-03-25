'use client'
import { useState, useCallback } from 'react'
import { cols } from '@/app/payslip/config/payslipColumnsConfig'
import { Button } from '@/components/ui/button'
import { PayslipTable } from '@/app/payslip/PayslipTable'
import { parseTsvPayslips } from './parseTsvPayslips'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import styles from '../../dropzone.module.css'

export default function TsvImportClient() {
  const [tsvContent, setTsvContent] = useState('')
  const [previewData, setPreviewData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setTsvContent(content)

    try {
      const parsedPayslips = parseTsvPayslips(content)
      setPreviewData(parsedPayslips)
      setError(null)
    } catch (error) {
      console.error('Failed to parse TSV:', error)
      setPreviewData([])
      setError(error instanceof Error ? error.message : 'Invalid TSV format')
    }
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'text/tab-separated-values' || file.name.endsWith('.tsv'))) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTsvContent(content)

        try {
          const parsedPayslips = parseTsvPayslips(content)
          setPreviewData(parsedPayslips)
          setError(null)
        } catch (error) {
          console.error('Failed to parse TSV:', error)
          setPreviewData([])
          setError(error instanceof Error ? error.message : 'Invalid TSV format')
        }
      }
      reader.readAsText(file)
    }
  }, [])

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

  return (
    <div className="d-flex gap-4">
      <div style={{ flex: 3 }}>
        <textarea
          className={styles.uploadZone}
          style={{ width: '100%', height: '200px', marginBottom: '20px' }}
          value={tsvContent}
          onChange={handleTextChange}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          placeholder="Paste TSV here or drop a .tsv file"
        />
        {error && <div className="text-danger mb-3">{error}</div>}
      </div>
      {previewData.length > 0 && (
        <div>
          <h4>Preview</h4>
          <PayslipTable
            data={previewData}
            // @ts-ignore
            cols={cols}
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
        <h5>TSV Import Guidelines</h5>
        <ul style={{ fontSize: '0.8rem' }}>
          <li>Supports Meta payslip TSV format</li>
          <li>Ignores YTD (Year-to-Date) values</li>
          <li>Extracts key financial information</li>
          <li>Supports drag-and-drop or paste</li>
          <li>Validates data before import</li>
        </ul>
        <h5 className="mt-3">Extracted Fields</h5>
        <ul style={{ fontSize: '0.8rem' }}>
          <li>Period Start</li>
          <li>Period End</li>
          <li>Pay Date</li>
          <li>Salary</li>
          <li>Bonus</li>
          <li>Net Pay</li>
          <li>OASDI Tax</li>
          <li>Medicare Tax</li>
          <li>State Tax</li>
          <li>State Disability</li>
          <li>Federal Additional Withholding</li>
          <li>State Additional Withholding</li>
        </ul>
      </div>
    </div>
  )
}
