'use client'

import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { parseString } from 'xml2js'

interface ProductKeyForImport {
  id: number
  uid: number
  productId: string
  productKey: string
  productName: string
  computerName: string
  comment: string
  usedOn: string
  claimedDate: string
  keyType: string
  keyRetrievalNote: string
}

// This code creates a React component that accepts an XML file via
// drag and drop or file selection. It then parses the XML file and
// returns the data in an array of arrays, where each inner array
// represents a row in the table. The data is then displayed in a table.
const ProductKeyUploader: React.FC = () => {
  const [productKeys, setProductKeys] = useState<ProductKeyForImport[]>([])
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      parseXml(event.target.files[0])
    }
  }

  const parseXml = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target) {
        const xml = event.target.result
        parseString(xml!, (err, result) => {
          if (err) {
            console.error(err)
          } else {
            const uniqueProductKeys: Set<string> = new Set()
            const productKeys: ProductKeyForImport[] = []
            result.root.YourKey[0].Product_Key.forEach((productKey: any) => {
              productKey.Key.forEach((key: any) => {
                if (!uniqueProductKeys.has(key._)) {
                  uniqueProductKeys.add(key._)
                  productKeys.push({
                    id: key.$.ID,
                    uid: 0,
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
          }
        })
      }
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {file && (
        <Table size="sm" striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>UID</th>
              <th>Product ID</th>
              <th>Product Key</th>
              <th>Product Name</th>
              <th>Computer Name</th>
              <th>Comment</th>
              <th>Used On</th>
              <th>Claimed Date</th>
              <th>Key Type</th>
              <th>Key Retrieval Note</th>
            </tr>
          </thead>
          <tbody>
            {productKeys.map((productKey, index) => (
              <tr key={index}>
                <td>{productKey.id}</td>
                <td>{productKey.uid}</td>
                <td>{productKey.productId}</td>
                <td>{productKey.productKey}</td>
                <td>{productKey.productName}</td>
                <td>{productKey.computerName}</td>
                <td>{productKey.comment}</td>
                <td>{productKey.usedOn}</td>
                <td>{productKey.claimedDate}</td>
                <td>{productKey.keyType}</td>
                <td>{productKey.keyRetrievalNote}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default ProductKeyUploader
