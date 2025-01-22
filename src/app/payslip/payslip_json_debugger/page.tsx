'use client'
import { DragEvent, FormEvent, useState } from 'react'
import { parseEntities } from '@/app/payslip/payslipSchemaReducer'
import Container from '@/components/container'

export default function PayslipJsonDebugPage() {
  const [json, setJson] = useState('{}')
  let entitles = ''
  try {
    entitles = JSON.stringify(JSON.parse(json)?.document?.entitiesList, null, 2)
  } catch (err) {
    entitles = err?.toString() ?? 'error: null'
  }
  const parsed = parseEntities(json)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const x = reader.result
      if (typeof x === 'string') {
        setJson(x)
      } else {
        alert('Cannot handle dropped file type: ' + typeof x)
      }
    }
    reader.readAsText(file)
  }

  const handleDragOver = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Container>
      <div
        onDrop={handleDrop}
        style={{
          border: '2px dashed #666',
          padding: '10px',
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <p>You can drop a JSON file in here</p>
        <textarea
          onDragOver={handleDragOver}
          onChange={(e) => setJson(e.currentTarget.value)}
          value={json}
          rows={20}
          style={{ width: '100%' }}
        />
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 pr-2">
          <textarea readOnly value={entitles} rows={15} className="w-full p-2 border-2 border-gray-300 rounded" />
        </div>
        <div className="w-1/2 pl-2">
          <textarea
            readOnly
            value={JSON.stringify(parsed, null, 2)}
            rows={20}
            className="w-full p-2 border-2 border-gray-300 rounded"
          />
        </div>
      </div>
    </Container>
  )
}
