'use client'
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'

interface Props {
  data: string[][]
  onColumnClick?: (columnIndex: number) => void
}

const Table2D: React.FC<Props> = ({ data, onColumnClick }) => {
  const [highlightedColumn, setHighlightedColumn] = useState<number | null>(null)

  const handleHeaderHover = (columnIndex: number) => {
    setHighlightedColumn(columnIndex)
  }

  const handleHeaderClick = (columnIndex: number) => {
    if (onColumnClick) {
      onColumnClick(columnIndex)
    }
  }

  if (!data || !data[0] || !data[1]) {
    return null
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {data[0].map((header, columnIndex) => (
            <th
              key={columnIndex}
              onMouseOver={() => handleHeaderHover(columnIndex)}
              onClick={() => handleHeaderClick(columnIndex)}
              className={highlightedColumn === columnIndex ? 'table-active' : ''}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <td
                key={columnIndex}
                onMouseOver={() => handleHeaderHover(columnIndex)}
                onClick={() => handleHeaderClick(columnIndex)}
                className={highlightedColumn === columnIndex ? 'table-active' : ''}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Table2D
