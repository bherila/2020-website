'use client'
import { useEffect, useState } from 'react'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'
import styles from './dropzone.module.css'

interface Props {
  onJsonPreview?: (rows: any[]) => void
  acceptTypes?: string[]
}

export default function FileUploadClient(props: Props) {
  const [jsonFiles, setJsonFiles] = useState<File[]>([])
  const [pdfFiles, setPdfFiles] = useState<File[]>([])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const acceptedFiles = props.acceptTypes
      ? droppedFiles.filter((file) => props.acceptTypes?.includes(file.type))
      : droppedFiles
    const newJsonFiles = acceptedFiles.filter((file) => file.type === 'application/json')
    const newPdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf')
    setJsonFiles(newJsonFiles)
    setPdfFiles(newPdfFiles)
  }

  const { onJsonPreview } = props
  useEffect(() => {
    if (typeof onJsonPreview === 'function') {
      const promises = jsonFiles.map((jsonFile) => jsonFile.text())
      Promise.all(promises).then((jsons) => {
        onJsonPreview(jsons.map((json) => parseEntities(json)))
      })
    }
  }, [jsonFiles])

  const handleFileUpload = async (file: File, endpoint: string) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies
      })

      // Handle the API response as needed
      console.log('Upload successful:', await response.json())
    } catch (error) {
      // Handle errors
      console.error('Upload failed:', error)
    }
  }

  const handleUploadAll = () => {
    // Upload JSON files to one endpoint
    jsonFiles.forEach((file) => handleFileUpload(file, 'JSON_API_ENDPOINT'))

    // Upload PDF files to another endpoint
    pdfFiles.forEach((file) => handleFileUpload(file, 'PDF_API_ENDPOINT'))
  }

  const [isDragging, setIsDragging] = useState(false)
  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          setIsDragging(false)
        }}
        onDragEnd={(e) => {
          setIsDragging(false)
        }}
        onMouseOut={(e) => {
          setIsDragging(false)
        }}
        className={`py-2 ${styles.uploadZone} ${isDragging ? styles.dragging : ''}`}
      >
        Drop payslip JSON and PDF files here to add them. Get JSON file from{' '}
        <a
          target="_blank"
          rel="nofollow noopener noreferrer"
          href="https://www.gstatic.com/cloud-site-ux/document_ai/document_ai.min.html"
        >
          Document AI
        </a>
      </div>
      {jsonFiles.length + pdfFiles.length > 0 && (
        <>
          <ul>
            <li>
              <strong>JSON Files:</strong>
              <ul>
                {jsonFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>PDF Files:</strong>
              <ul>
                {pdfFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </li>
          </ul>
          <button onClick={handleUploadAll}>Upload All</button>
        </>
      )}
    </div>
  )
}
