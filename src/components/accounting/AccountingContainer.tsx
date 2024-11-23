import AccountingHeader from './AccountingHeader'

const drawerWidth = 240

export default function AccountingContainer({ children, sidebar }: { children: any; sidebar?: any }) {
  return <AccountingHeader isFixed={true} drawerWidth={drawerWidth} />
}
