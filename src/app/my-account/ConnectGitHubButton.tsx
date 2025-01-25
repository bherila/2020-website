import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function ConnectGitHubButton() {
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
      <Button variant="outline" className="gap-2">
        <Github className="h-4 w-4" />
        Connect GitHub
      </Button>
    </div>
  )
}
