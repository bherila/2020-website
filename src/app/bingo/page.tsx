'use client'
import Container from '@/components/container'

import MainTitle from '@/components/main-title'
import BingoForm, { BingoData } from '@/app/bingo/BIngoForm'
import { useMemo, useState } from 'react'
import BingoCard from '@/app/bingo/BingoCard'

function createRandomSquareArray<T>(N: number, L: T[]): T[][] {
  if (L.length < N * N) {
    throw new Error('List L must contain at least N^2 items')
  }

  // Shuffle the array randomly
  const shuffledArray = [...L].sort(() => Math.random() - 0.5)

  // Create the 2D square array
  const resultArray: T[][] = []
  for (let i = 0; i < N; i++) {
    const row = shuffledArray.slice(i * N, (i + 1) * N)
    resultArray.push(row)
  }

  return resultArray
}

export default function BingoPage() {
  const [input, setInput] = useState<BingoData | null>(null)
  const [error, setError] = useState<any>(null)

  const generatedCards = useMemo(() => {
    try {
      if (!input?.numCards) {
        return []
      }
      const cards = new Map<string, string[][]>()
      while (cards.size < input.numCards) {
        const card = createRandomSquareArray(5, input.itemsList)
        if (input.activateFreeSpace) {
          card[2][2] = 'Free Space :)'
        }
        const cardJson = JSON.stringify(card)
        if (!cards.has(cardJson)) {
          cards.set(cardJson, card)
        } else {
          console.warn('generated a dupe! try again.')
        }
      }
      return Array.from(cards.values())
    } catch (err) {
      setError(err)
      return []
    }
  }, [input])

  return (
    <Container>
      <MainTitle>Bingo Card Generator</MainTitle>
      <div className="flex justify-center">
        <div className="w-1/2">
          <div className="space-y-8 my-8">
            <div className="max-w-none">
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Enter the list of items (minimum 25 items required)</li>
                <li>
                  Choose the number of cards to generate:
                  <ul className="list-disc list-outside ml-6 mt-2">
                    <li>Up to a few hundred cards works well on most browsers</li>
                    <li>Up to a few thousand cards on faster computers</li>
                  </ul>
                </li>
                <li>Click the generate button</li>
                <li>Use Ctrl+P to print (skip the first page with the form)</li>
                <li>Each generated card will be unique - no duplicates!</li>
                <li>
                  Source code available on{' '}
                  <a
                    href="https://github.com/bherila/2020-website/tree/prod/src/app/bingo"
                    className="text-primary hover:underline"
                  >
                    Github repo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <BingoForm onSubmit={(data) => setInput(data)} />
        </div>
      </div>
      <div className="w-full">
        {generatedCards.map((bingoCard, i) => (
          <div key={i} className="text-center" style={{ pageBreakBefore: 'always' }}>
            <MainTitle>Card #{i}</MainTitle>
            <BingoCard data={bingoCard} />
          </div>
        ))}
      </div>
    </Container>
  )
}
