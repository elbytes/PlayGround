import React from 'react'
import './IncomingCallDialogue.css'
import { Button } from 'react-bootstrap'
import {
  acceptIncomingCall,
  rejectIncomingCall,
} from '../../utils/webRTC/webRTCHandler'

const IncomingCallDialogue = ({ callerUsername }) => {
  const handleAcceptBtnClikced = () => {
    acceptIncomingCall()
  }
  const handleRejectBtnClikced = () => {
    rejectIncomingCall()
  }
  return (
    <div>
      <span>{callerUsername} is calling...</span>
      <div>
        <Button
          variant='success'
          style={{ marginRight: 1 + 'em' }}
          onClick={handleAcceptBtnClikced}
        >
          Accept
        </Button>
        <Button variant='danger' onClick={handleRejectBtnClikced}>
          Reject
        </Button>
      </div>
    </div>
  )
}

export default IncomingCallDialogue
