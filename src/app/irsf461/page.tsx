import ExcessBusinessLossClient from './ExcessBusinessLossClient'
import Container from '@/components/container'

export default function Page() {
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Excess Business Loss Simulation</h1>
      <ExcessBusinessLossClient />
    </Container>
  )
}
