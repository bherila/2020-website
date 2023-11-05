import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface CustomModalProps {
  show: boolean
  onHide: () => void
  value: any
}

const CustomModal: React.FC<CustomModalProps> = ({ show, onHide, value }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detail view</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          readOnly
          style={{ width: '100%', fontFamily: 'Atkinson Hyperlegible' }}
          rows={20}
          value={
            typeof value === 'string' ? value : JSON.stringify(value, null, 2)
          }
        />
      </Modal.Body>
    </Modal>
  )
}

function PopoverContent(props: { content: any }) {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  return (
    <div>
      <button onClick={handleShowModal}>Show Modal</button>
      {showModal && (
        <CustomModal
          show={showModal}
          onHide={handleHideModal}
          value={props.content}
        />
      )}
    </div>
  )
}

export default PopoverContent
