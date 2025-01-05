import { Button as ShadcnButton } from '@/components/ui/button'

export default function Button(props: {
  children?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}): React.ReactElement {
  return <ShadcnButton {...props} />
}
