'use client'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Container from '@/components/container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DroppableTextArea from '@/components/DroppableTextArea'
import Form from 'react-bootstrap/Form'
import parseDelimitedText from '@/components/parseDelimitedText'
import { SetDocumentProps } from '@/lib/data2d'

export function SetDocumentButton(props: SetDocumentProps & { children: any }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        {props.children ?? 'Load data'}
      </Button>
      <SetDocumentModal {...props} {...{ showModal, setShowModal }} />
    </>
  )
}

function SetDocumentModal(
  props: SetDocumentProps & {
    showModal: boolean
    setShowModal: (shouldShow: boolean) => void
  },
) {
  const { showModal, setShowModal, ...childProps } = props
  const handleCloseModal = () => setShowModal(false)
  return (
    <Modal size="lg" show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Load data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SetDocumentInline setDocFn={props.setDocFn} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function SetDocumentInline(props: SetDocumentProps) {
  const [delimiter, setDelimiter] = useState('Tab')
  const [text, setText] = useState('')
  useEffect(() => {
    const data = parseDelimitedText(text, delimiter === 'Tab' ? '\t' : ',')
    props.setDocFn(data)
  }, [delimiter, text])
  return (
    <Container fluid>
      <DelimiterSelectionRow {...{ delimiter, setDelimiter }} />
      <Row>
        <Col xs={12}>
          <DroppableTextArea data={text} setData={(t) => setText(t)} />
        </Col>
      </Row>
    </Container>
  )
}

function DelimiterSelectionRow({
  delimiter,
  setDelimiter,
}: {
  delimiter: string
  setDelimiter: (setter: string) => void
}) {
  return (
    <Row>
      <Col lg={2}>
        <Form.Label>Delimiter</Form.Label>
      </Col>
      <Col lg={10} className="d-flex justify-content-start">
        <Form.Check
          type="radio"
          label="Tab"
          name="delimiter"
          id="tab-radio"
          checked={delimiter === 'Tab'}
          onChange={() => setDelimiter('Tab')}
          className="me-4"
        />
        <Form.Check
          type="radio"
          label="CSV"
          name="delimiter"
          id="csv-radio"
          checked={delimiter === 'CSV'}
          onChange={() => setDelimiter('CSV')}
        />
      </Col>
    </Row>
  )
}
