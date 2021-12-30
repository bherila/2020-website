import moment from 'moment'

export function date2string(dt: any): string {
  return moment(dt).format('YYYY-MM-DD')
}
