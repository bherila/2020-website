import { ReactNode } from 'react'

export default function MainTitle({ children }: { children: ReactNode }) {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-5 pb-3">{children}</h1>
}
