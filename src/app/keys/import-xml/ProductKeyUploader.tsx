'use client'

import React, { useState, useRef } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'

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
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml as string, 'text/xml')

        const productKeys: ProductKeyForImport[] = []
        const uniqueProductKeys = new Set<string>()

        const productKeysNodes = xmlDoc.getElementsByTagName('Product_Key')
        for (let i = 0; i < productKeysNodes.length; i++) {
          const productKey = productKeysNodes[i]
          const productName = productKey.getAttribute('Name') || ''

          const keyNodes = productKey.getElementsByTagName('Key')
          for (let j = 0; j < keyNodes.length; j++) {
            const key = keyNodes[j]
            const keyValue = key.textContent || ''
            const claimedDate = key.getAttribute('ClaimedDate') || ''
            const keyType = key.getAttribute('Type') || ''

            if (keyValue && !uniqueProductKeys.has(keyValue)) {
              uniqueProductKeys.add(keyValue)
              productKeys.push({
                productId: productName,
                productKey: keyValue,
                productName: productName,
                computerName: '',
                comment: '',
                usedOn: '',
                claimedDate: claimedDate,
                keyType: keyType,
                keyRetrievalNote: productKey.getAttribute('KeyRetrievalNote') || '',
              })
            }
          }
        }

        setProductKeys(productKeys)
        setError(null)
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
        <Alert variant="destructive" className="mt-3">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {file && productKeys.length > 0 && (
        <>
          <div className="d-flex justify-content-center pt-3">
            <Button onClick={handleUpload} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Uploading...
                </>
              ) : (
                'Upload Product Keys'
              )}
            </Button>
          </div>
          <Table className="mt-3">
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Key</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Claimed Date</TableHead>
                <TableHead>Key Type</TableHead>
                <TableHead>Key Retrieval Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productKeys.map((productKey, index) => (
                <TableRow key={index}>
                  <TableCell>{productKey.productId}</TableCell>
                  <TableCell>{productKey.productKey}</TableCell>
                  <TableCell>{productKey.productName}</TableCell>
                  <TableCell>{productKey.claimedDate}</TableCell>
                  <TableCell>{productKey.keyType}</TableCell>
                  <TableCell>{productKey.keyRetrievalNote}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  )
}

export default ProductKeyUploader
