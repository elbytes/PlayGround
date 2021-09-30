import React, { useEffect } from 'react'
import './CallRejected.css'
const CallRejected = ({ reason, hideCallRejectedDialog }) => {
  useEffect(() => {
    setTimeout(() => {
      hideCallRejectedDialog({ rejected: false, reason: '' })
    }, [5000])
  }, [hideCallRejectedDialog])
  return <div className='call_rejected'>{reason}</div>
}

export default CallRejected
