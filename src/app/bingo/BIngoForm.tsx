import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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
    <Container>
      <Form>
        <Form.Group as={Row} controlId="activateFreeSpace">
          <Form.Label column sm={2}>
            Activate free space?
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label="Yes"
              checked={activateFreeSpace}
              onChange={(e) => setActivateFreeSpace(e.target.checked)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="itemsList">
          <Form.Label column sm={2}>
            List of items
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} value={itemsList} onChange={(e) => setItemsList(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="numCards">
          <Form.Label column sm={2}>
            Number of cards to generate
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" value={numCards} onChange={(e) => setNumCards(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={handleGenerateCards}>Generate Bingo Cards</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default BingoForm
