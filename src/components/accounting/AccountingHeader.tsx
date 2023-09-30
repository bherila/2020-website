import * as React from 'react'

const name = 'Meemee 💸'
const base = '/accounting'
const pages = [
  ['Equity', base + '/equity'],
  ['Option', base + '/option'],
  ['I/O', base + '/io'],
  ['Interest', base + '/interest'],
  ['Credit/Fees', base + '/credit-and-fees'],
  ['Matcher', base + '/matcher'],
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const ResponsiveAppBar = ({
  isFixed,
}: {
  isFixed: boolean
  drawerWidth: number
}) => {
  return <div>appbar</div>
}
export default ResponsiveAppBar
