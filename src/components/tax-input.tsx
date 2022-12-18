import { TextBox } from 'devextreme-react'
import React from 'react'

import useTaxData from '../hooks/useTaxData'

interface TaxInputProps {
  line: string
  title: string
  readOnly?: boolean
  key: string
}

export default function TaxInput(props: TaxInputProps) {
  const { title, readOnly, key, line } = props
  const data = useTaxData(key)
  return (
    <tr>
      <td style={{ textAlign: 'right' }}>{title}</td>
      <td>
        <TextBox
          mask="$ #0.00"
          value={data.value || ''}
          readOnly={readOnly}
          onValueChanged={(e) => {
            data.setValue(e.value.toString())
          }}
        />
      </td>
      <td>{line}</td>
    </tr>
  )
}
