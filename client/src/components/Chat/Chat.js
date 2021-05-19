import React, { useState, useEffect } from 'react'
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
  const [isTyping, setIsTyping] = useState(false)

  const handleOnKeyDown = (e) => {
    setIsTyping(true)
  }
  const handleOnKeyUp = (e) => {
    setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessageUsingDataChannel(inputValue)
    setInputValue('')
  }

  // useEffect(() => {
  //   if (message.received) {
  //     setTimeout(() => {
  //       setDirectCallMessage(false, '')
  //     }, [2000])
  //   }
  // }, [])

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
                onKeyDown={handleOnKeyDown}
                onKeyUp={handleOnKeyUp}
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
        <Row>
          <Col>
            {isTyping && <span style={styles.typing}>friend is typing...</span>}
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Chat
