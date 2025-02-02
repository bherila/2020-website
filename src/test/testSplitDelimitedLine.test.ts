import { splitDelimitedText } from '@/lib/splitDelimitedText'

describe('splitDelimitedText', () => {
  it('splits CSV text correctly', () => {
    const csvText = `hello,"world,with,commas",foo\\,bar
"multi-line
column",another column
`
    const expectedOutput = [
      ['hello', 'world,with,commas', 'foo,bar'],
      ['multi-line\ncolumn', 'another column'],
    ]
    expect(splitDelimitedText(csvText)).toEqual(expectedOutput)
  })

  it('splits TSV text correctly', () => {
    const tsvText = `hello\t"world,with,commas"\tfoo\\,bar
"multi-line
 column"\tanother column
`
    const expectedOutput = [
      ['hello', 'world,with,commas', 'foo,bar'],
      ['multi-line\n column', 'another column'],
    ]
    expect(splitDelimitedText(tsvText)).toEqual(expectedOutput)
  })

  it('splits pipe-separated text correctly', () => {
    const pipeText = `hello|"world,with,commas"|foo\\,bar
"multi-line
 column"|another column
`
    const expectedOutput = [
      ['hello', 'world,with,commas', 'foo,bar'],
      ['multi-line\n column', 'another column'],
    ]
    expect(splitDelimitedText(pipeText)).toEqual(expectedOutput)
  })

  it('throws error if unable to detect delimiter', () => {
    const invalidText = `hello world
foo bar`
    expect(() => splitDelimitedText(invalidText)).toThrowError('Unable to detect delimiter')
  })

  it('handles empty text', () => {
    expect(splitDelimitedText('')).toEqual([])
  })

  it('handles single-line text', () => {
    const text = `hello,"world,with,commas",foo\\,bar`
    const expectedOutput = [['hello', 'world,with,commas', 'foo,bar']]
    expect(splitDelimitedText(text)).toEqual(expectedOutput)
  })
})
