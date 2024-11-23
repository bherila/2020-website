import { ChangeEvent } from 'react'
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
        <input
          value={data.value || ''}
          readOnly={readOnly}
          onChange={(event: ChangeEvent<HTMLInputElement>) => data.setValue(event.target.value)}
          type="text"
          className="form-control"
        />
      </td>
      <td>{line}</td>
    </tr>
  )
}
