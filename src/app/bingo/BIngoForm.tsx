import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

function getInitialNumbers() {
  const r = []
  for (let i = 0; i < 99; ++i) {
    r.push(i.toString())
  }
  return r
}

export interface BingoData {
  itemsList: string[]
  activateFreeSpace: boolean
  numCards: number
}

const BingoForm = (props: { onSubmit: (data: BingoData) => void }) => {
  const [activateFreeSpace, setActivateFreeSpace] = useState(false)
  const [itemsList, setItemsList] = useState(getInitialNumbers().join('\n'))
  const [numCards, setNumCards] = useState('')

  const handleGenerateCards = () => {
    props.onSubmit({
      itemsList: itemsList
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean),
      activateFreeSpace,
      numCards: parseInt(numCards, 10),
    })
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="activateFreeSpace"
          checked={activateFreeSpace}
          onCheckedChange={(checked) => setActivateFreeSpace(!!checked)}
        />
        <Label htmlFor="activateFreeSpace">Activate free space?</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="itemsList">List of items</Label>
        <Input
          id="itemsList"
          as="textarea"
          rows={3}
          value={itemsList}
          onChange={(e) => setItemsList(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="numCards">Number of cards to generate</Label>
        <Input id="numCards" type="number" value={numCards} onChange={(e) => setNumCards(e.target.value)} />
      </div>

      <Button onClick={handleGenerateCards} className="w-full">
        Generate Bingo Cards
      </Button>
    </div>
  )
}

export default BingoForm
