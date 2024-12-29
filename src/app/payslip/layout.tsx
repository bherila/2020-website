import PayslipNavigation from './PayslipNavigation'

export default function PayslipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <PayslipNavigation />
      {children}
    </div>
  )
}
