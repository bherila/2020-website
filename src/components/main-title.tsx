import { ReactNode } from 'react'

export default function MainTitle({ children }: { children: ReactNode }) {
  return <h1 className="pt-5 pb-3">{children}</h1>
}
