'use client'
import { Button } from '@/components/ui/button'

export default function DeleteButton({
  tagId,
  disabled,
  deleteAction,
}: {
  tagId: string
  disabled: boolean
  deleteAction: (fd: FormData) => Promise<void>
}) {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('tag_id', tagId)
        deleteAction(fd)
          .then((r) => console.log('DeleteTag result:', r))
          .catch((e) => console.error('DeleteTag error:', e))
      }}
      type="button"
      variant="destructive"
      size="sm"
      disabled={disabled}
    >
      Archive
    </Button>
  )
}
