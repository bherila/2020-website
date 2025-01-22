'use client'
import { useState } from 'react'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'

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
    <Table>
      <TableHeader>
        <TableRow>
          {data[0].map((header, columnIndex) => (
            <TableHead
              key={columnIndex}
              onMouseOver={() => handleHeaderHover(columnIndex)}
              onClick={() => handleHeaderClick(columnIndex)}
              className={highlightedColumn === columnIndex ? 'table-active' : ''}
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.slice(1).map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <TableCell
                key={columnIndex}
                onMouseOver={() => handleHeaderHover(columnIndex)}
                onClick={() => handleHeaderClick(columnIndex)}
                className={highlightedColumn === columnIndex ? 'table-active' : ''}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Table2D
