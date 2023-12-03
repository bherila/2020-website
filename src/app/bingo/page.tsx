'use client'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
      <Row>
        <Col xs={12}>
          <MainTitle>Bingo card generator</MainTitle>
          <ul>
            <li>Enter the list of items. Min 25 items.</li>
            <li>
              Pick # of cards you want. If you pick too big of a #, you might
              crash your browser. Up to a few hundred is probably fine. A few
              thousand if you have a fast computer.
            </li>
            <li>
              Press generate button. Then Ctrl+P to print. Skip this first page
              :)
            </li>
            <li>No duplicate cards will be generated!</li>
            <li>
              Source code available on{' '}
              <a href="https://github.com/bherila/2020-website/tree/prod/src/app/bingo">
                Github repo
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <BingoForm onSubmit={(data) => setInput(data)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {generatedCards.map((bingoCard, i) => (
            <div
              key={i}
              style={{ textAlign: 'center', pageBreakBefore: 'always' }}
            >
              <MainTitle>Card #{i}</MainTitle>
              <BingoCard data={bingoCard} />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  )
}
