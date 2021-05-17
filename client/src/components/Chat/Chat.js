import React, { useState, useEffect } from 'react'
import { sendMessageUsingDataChannel } from '../../utils/webRTC/webRTCHandler'
import MessageDisplay from '../Chat/MessageDisplay'
import './Chat.css'
function Chat({ message, setDirectCallMessage }) {
  const [inputValue, setInputValue] = useState('')
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue)
      setInputValue('')
    }
  }

  useEffect(() => {
    if (message.received) {
      setTimeout(() => {
        setDirectCallMessage(false, '')
      }, [2000])
    }
  }, [message.received, setDirectCallMessage])

  return (
    <>
      <span>Chat</span>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onKeyDown={handleOnKeyDown}
        placeholder='Type your message'
      />
      {message.received && <MessageDisplay message={message.content} />}
    </>
  )
}

export default Chat
