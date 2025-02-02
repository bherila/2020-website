export function splitDelimitedLine(line: string, delimiter: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  let escapeNext = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (escapeNext) {
      current += char
      escapeNext = false
      continue
    }

    if (char === '\\') {
      escapeNext = true
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (!inQuotes && char === delimiter) {
      result.push(current)
      current = ''
      continue
    }

    current += char
  }

  result.push(current)
  return result
}
