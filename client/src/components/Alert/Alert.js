import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const Alert = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure?</h4>
        <p>If you continue, you will lose all progress in this activity.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={props.onProceed}>Yes, Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Alert
