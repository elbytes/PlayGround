import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { sendMessageUsingDataChannel } from '../../utils/webRTC/webRTCHandler'
import MessageDisplay from '../Chat/MessageDisplay'
import './Chat.css'

const styles = {
  chatBtn: {
    float: 'right',
  },
  typing: {
    color: 'darkgrey',
  },
  col: {
    width: 'auto',
    marginRight: '0.5em',
  },
}
function Chat({ message, setDirectCallMessage }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessageUsingDataChannel(inputValue)
    setInputValue('')
  }

  return (
    <>
      {message.received && (
        <MessageDisplay className='chatDisplay' message={message.content} />
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10} style={styles.col}>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Control
                as='textarea'
                rows={1}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                }}
                placeholder='Type your message'
              />
            </Form.Group>
          </Col>
          <Col>
            <Button style={styles.chatBtn} variant='danger' type='submit'>
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Chat
