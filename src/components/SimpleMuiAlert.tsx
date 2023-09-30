import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function SimpleMuiAlert(props: {
  children?: React.ReactNode
  onClose: () => void
  text?: string
  open: boolean
}) {
  const { children, text, ...modalProps } = props
  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/*<Modal.Header closeButton>*/}
      {/*  <Modal.Title id="contained-modal-title-vcenter">*/}
      {/*    */}
      {/*  </Modal.Title>*/}
      {/*</Modal.Header>*/}
      <Modal.Body>
        {children}
        {text}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
