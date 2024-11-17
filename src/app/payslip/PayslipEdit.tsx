import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { fin_payslip, fin_payslip_schema } from '@/app/payslip/payslipDbCols'

interface PayslipEditProps {
  show: boolean
  onHide: () => void
  value: fin_payslip
  onSave: (newValue: fin_payslip) => void
}

const CustomModal: React.FC<PayslipEditProps> = ({ show, onHide, value, onSave }) => {
  const { other, ...x } = value
  const [editedValue, setEditedValue] = useState(JSON.stringify(x, null, 2))
  const [editedOther, setEditedOther] = useState(JSON.stringify(other, null, 2))
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payslip</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          style={{ width: '100%', fontFamily: 'Atkinson Hyperlegible' }}
          rows={20}
          value={editedValue}
          onChange={(x) => setEditedValue(x.currentTarget.value)}
        />
        <textarea
          style={{ width: '100%', fontFamily: 'Atkinson Hyperlegible' }}
          rows={20}
          value={editedOther}
          onChange={(e) => setEditedOther(e.currentTarget.value)}
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
            let val = JSON.parse(editedValue)
            val.other = JSON.parse(editedOther)
            onSave(fin_payslip_schema.parse(val))
          }}
        >
          Save
        </Button>
      </Modal.Body>
    </Modal>
  )
}

function PayslipEditButton(props: { content: fin_payslip; onSave: (newValue: fin_payslip) => void }) {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleHideModal = () => setShowModal(false)

  return (
    <div>
      <button onClick={handleShowModal}>Edit</button>
      {showModal && <CustomModal show={showModal} onHide={handleHideModal} value={props.content} onSave={props.onSave} />}
    </div>
  )
}

export default PayslipEditButton
