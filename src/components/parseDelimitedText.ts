export default function parseDelimitedText(
  input: string,
  delimiter: string = ',',
  quoteChar: string = '"',
  escapeChar: string = '\\',
): string[][] {
  const rows: string[][] = []
  let columns: string[] = []
  let currentColumn = ''
  let inQuote = false
  let escaped = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]

    if (escaped) {
      // If the previous character was an escape character, add this character to the current column
      currentColumn += char
      escaped = false
    } else if (char === escapeChar) {
      // If this character is an escape character, set the escaped flag to true
      escaped = true
    } else if (char === quoteChar) {
      inQuote = !inQuote
    } else if (char === delimiter && !inQuote) {
      columns.push(currentColumn)
      currentColumn = ''
    } else if (char === '\n' && !inQuote) {
      columns.push(currentColumn)
      if (columns[0]) {
        rows.push(columns)
      }
      columns = []
      currentColumn = ''
    } else {
      currentColumn += char
    }
  }

  if (currentColumn !== '') {
    columns.push(currentColumn)
    if (columns[0]) {
      rows.push(columns)
    }
  }

  return rows
}
