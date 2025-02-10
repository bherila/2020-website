'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import Container from '@/components/container'
import DroppableTextArea from '@/components/DroppableTextArea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import parseDelimitedText from '@/components/parseDelimitedText'
import { SetDocumentProps } from '@/lib/data2d'

export function SetDocumentButton(props: SetDocumentProps & { children: any }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{props.children ?? 'Load data'}</Button>
      <SetDocumentModal {...props} {...{ open, setOpen }} />
    </>
  )
}

function SetDocumentModal(
  props: SetDocumentProps & {
    open: boolean
    setOpen: (open: boolean) => void
  },
) {
  const { open, setOpen, ...childProps } = props
  const handleCloseModal = () => setOpen(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Load data</DialogTitle>
        </DialogHeader>
        <SetDocumentInline setDocFn={props.setDocFn} />
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SetDocumentInline(props: SetDocumentProps) {
  const [delimiter, setDelimiter] = useState('Tab')
  const [text, setText] = useState('')
  useEffect(() => {
    const data = parseDelimitedText(text, delimiter === 'Tab' ? '\t' : ',')
    props.setDocFn(data)
  }, [delimiter, text, props.setDocFn])
  return (
    <Container fluid>
      <DelimiterSelectionRow {...{ delimiter, setDelimiter }} />
      <DroppableTextArea data={text} setData={(t) => setText(t)} />
    </Container>
  )
}

function DelimiterSelectionRow({ delimiter, setDelimiter }: { delimiter: string; setDelimiter: (setter: string) => void }) {
  return (
    <div>
      <Label>Delimiter</Label>
      <RadioGroup defaultValue={delimiter} onValueChange={setDelimiter} className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Tab" id="tab-radio" />
          <Label htmlFor="tab-radio">Tab</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CSV" id="csv-radio" />
          <Label htmlFor="csv-radio">CSV</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
