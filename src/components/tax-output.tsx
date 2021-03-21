import React from 'react'
import TextBox from 'devextreme-react/text-box'
import useTaxData from '../hooks/useTaxData'

interface TaxOutputProps {
  line: string
  title: string
  result: string
}

export default function TaxOutput(props: TaxOutputProps) {
  const { line, title, result } = props
  return (
    <tr>
      <td style={{ textAlign: 'right' }}>{title}</td>
      <td>{result}</td>
      <td>{line}</td>
    </tr>
  )
}
