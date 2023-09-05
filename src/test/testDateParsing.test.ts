import { parse } from 'date-fns'

import { parseDate } from '@/lib/DateHelper'

describe('parse', () => {
  it('should parse a date string in the format "MMM D `yy"', () => {
    const dateString = 'Feb 12 `21'
    const expectedDate = new Date(2021, 1, 12, 0, 0, 0, 0)

    const parsedDate = parse(dateString, 'MMM d `yy', new Date())
    expect(parsedDate).toEqual(expectedDate)

    expect(parsedDate.getMonth()).toBe(1) // February
    expect(parsedDate.getDate()).toBe(12)
    expect(parsedDate.getFullYear()).toBe(2021)
  })

  it('should parse a date string in the format "MMM D `yy"', () => {
    const dateString = 'Dec 12 `99'
    const expectedDate = new Date(1999, 11, 12, 0, 0, 0, 0)

    const parsedDate = parse(dateString, 'MMM d `yy', new Date())
    expect(parsedDate).toEqual(expectedDate)

    expect(parsedDate.getMonth()).toBe(11) // February
    expect(parsedDate.getDate()).toBe(12)
    expect(parsedDate.getFullYear()).toBe(1999)
  })
})

describe('Date Parsing Library', () => {
  it('should parse 2023-09-24 correctly', () => {
    const date = parseDate('2023-09-24')?.value
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2023)
    expect(date?.getMonth()).toBe(8) // September is the 9th month
    expect(date?.getDate()).toBe(24)
  })

  it('should parse 23 Jan 2024 correctly', () => {
    const date = parseDate('23 Jan 2024')?.value
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0) // January is the 1st month
    expect(date?.getDate()).toBe(23)
  })

  it("should parse 23 Jan '24 correctly", () => {
    const date = parseDate("23 Jan '24")?.value
    expect(date).toBeInstanceOf(Date)
    expect(date?.getFullYear()).toBe(2024)
    expect(date?.getMonth()).toBe(0) // January is the 1st month
    expect(date?.getDate()).toBe(23)
  })
})
