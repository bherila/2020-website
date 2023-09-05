import { parse } from 'date-fns'

export class DateContainer {
  constructor(value: Date) {
    this.value = value
  }
  value: Date

  formatYMD(): string {
    return this.value.toISOString().slice(0, 10)
  }
}
export function parseDate(
  str: string | undefined | null | Date,
): DateContainer | null {
  if (!str) {
    return null
  }

  if (str instanceof Date) {
    return new DateContainer(str)
  }

  if (str.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new DateContainer(parse(str, 'yyyy-MM-dd', new Date()))
  }

  if (str.match(/^\d{1,2} [a-z]{3} \d{4}$/i)) {
    return new DateContainer(parse(str, 'dd MMM yyyy', new Date()))
  }

  // 23 Jan '24, 23 Jan `24
  if (str.match(/\d\d? [a-z]{3} '?`?\d{2}/i)) {
    const clean = str.replace(/['`]/g, '') // parse does not like the apostrophe
    return new DateContainer(parse(clean, 'dd MMM yy', new Date()))
  }

  // Jan 23 '24, Jan 23 `24
  if (str.match(/[a-z]{3} \d{1,2} `\d{2}$/i)) {
    const clean = str.replace(/['`]/g, '') // parse does not like the apostrophe
    return new DateContainer(parse(clean, 'MMM d yy', new Date()))
  }

  if (str.match(/[a-z]{3} \d{1,2} `\d{4}$/i)) {
    return new DateContainer(parse(str, 'MMM d `yyyy', new Date()))
  }
  return null
}
