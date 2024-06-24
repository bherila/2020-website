import { parseDate } from '@/lib/DateHelper'

export interface SetDocumentProps {
  setDocFn: (data: string[][]) => void
}

/*
  the transpose function takes a 2D array as input and returns its transposed
  version
*/
export function transpose<T>(data: T[][]): T[][] {
  return data[0].map((_, i) => data.map((row) => row[i]))
}

/*
  Typescript function that takes in a row-major string[][] and deletes any
  columns that contain all the same value. Excludes column header and
  ignores falsy (empty) values in the column. However it will remove columns
  that are only containing falsy (empty) values.
*/
export function deleteUniformColumns(matrix: string[][]): string[][] {
  // Transpose the matrix to make columns into rows
  const transposedMatrix = transpose(matrix)

  // Filter out columns that contain all the same value
  const filteredColumns = transposedMatrix.filter((column) => {
    const firstValue = column[1]
    return !column
      .slice(2)
      .filter(Boolean)
      .every((value) => value === firstValue)
  })

  // Transpose the matrix back to its original shape
  return transpose(filteredColumns)
}

export function deleteDuplicateRows(matrix: string[][]): string[][] {
  const uniqueRows: string[][] = []
  const rowSet: Set<string> = new Set()

  for (const row of matrix) {
    const rowString = JSON.stringify(row)
    if (!rowSet.has(rowString)) {
      uniqueRows.push(row)
      rowSet.add(rowString)
    }
  }

  return uniqueRows
}

export function deleteRowsWithOnlyOneColumn(matrix: string[][]): string[][] {
  const result: string[][] = []
  for (const row of matrix) {
    if (row.filter(Boolean).length > 1) {
      result.push(row)
    }
  }
  return result
}

export function reformatDates(matrix: string[][]): string[][] {
  return matrix.map((row) =>
    row.map((cell) => {
      const date = parseDate(cell)
      return date?.formatYMD() ?? cell
    }),
  )
}
