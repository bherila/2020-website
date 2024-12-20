'use client'

import React, { useState, useRef } from 'react'
import { Table, Button, Alert, Spinner } from 'react-bootstrap'
import { parseString } from 'xml2js'
import { ProductKeyForImport } from './actions'
import cn from 'classnames'

interface ProductKeyUploaderProps {
  uploadAction: (productKeys: ProductKeyForImport[]) => Promise<void>
}

const ProductKeyUploader: React.FC<ProductKeyUploaderProps> = ({ uploadAction }) => {
  const [productKeys, setProductKeys] = useState<ProductKeyForImport[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFile(event.target.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)

    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length > 0) {
      processFile(droppedFiles[0])
    }
  }

  const processFile = (selectedFile: File) => {
    // Ensure it's an XML file
    if (selectedFile.type !== 'text/xml' && selectedFile.name.toLowerCase().indexOf('.xml') === -1) {
      setError('Please upload a valid XML file')
      return
    }

    setFile(selectedFile)
    parseXml(selectedFile)
  }

  const parseXml = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target) {
        const xml = event.target.result
        parseString(xml!, (err, result) => {
          if (err) {
            console.error(err)
            setError('Failed to parse XML file')
          } else {
            const uniqueProductKeys: Set<string> = new Set()
            const productKeys: ProductKeyForImport[] = []
            result.root.YourKey[0].Product_Key.forEach((productKey: any) => {
              productKey.Key.forEach((key: any) => {
                if (!uniqueProductKeys.has(key._)) {
                  uniqueProductKeys.add(key._)
                  productKeys.push({
                    productId: productKey.$.Name,
                    productKey: key._,
                    productName: productKey.$.Name,
                    computerName: '',
                    comment: '',
                    usedOn: '',
                    claimedDate: key.$.ClaimedDate,
                    keyType: key.$.Type,
                    keyRetrievalNote: productKey.$.KeyRetrievalNote,
                  })
                }
              })
            })
            setProductKeys(productKeys)
            setError(null)
          }
        })
      }
    }
    reader.readAsText(file)
  }

  const handleUpload = async () => {
    if (productKeys.length === 0) {
      setError('No product keys to upload')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await uploadAction(productKeys)
      // Note: Redirect is handled in the server action
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn('p-4 border border-dashed rounded text-center cursor-pointer', {
          'border-primary bg-light': isDragOver,
          'border-secondary': !isDragOver,
        })}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xml" className="d-none" />
        <p className="text-muted">{isDragOver ? 'Drop XML file here' : 'Drag and drop XML file or click to select'}</p>
      </div>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {file && productKeys.length > 0 && (
        <>
          <div className="d-flex justify-content-center pt-3">
            <Button variant="primary" onClick={handleUpload} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Uploading...
                </>
              ) : (
                'Upload Product Keys'
              )}
            </Button>
          </div>
          <Table size="sm" striped className="mt-3">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Key</th>
                <th>Product Name</th>
                <th>Claimed Date</th>
                <th>Key Type</th>
                <th>Key Retrieval Note</th>
              </tr>
            </thead>
            <tbody>
              {productKeys.map((productKey, index) => (
                <tr key={index}>
                  <td>{productKey.productId}</td>
                  <td>{productKey.productKey}</td>
                  <td>{productKey.productName}</td>
                  <td>{productKey.claimedDate}</td>
                  <td>{productKey.keyType}</td>
                  <td>{productKey.keyRetrievalNote}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default ProductKeyUploader
