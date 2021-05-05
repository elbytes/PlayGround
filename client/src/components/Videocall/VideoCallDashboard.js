import React, { useRef, useState, useHistory, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { io } from 'socket.io-client'
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler'
import VideoCallDisplay from './VideoCallDisplay'
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList'
const VideoCallDashboard = ({ id }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream()
    return () => {}
  }, [])

  const [username, setUsername] = useState()

  return (
    <div className='border'>
      <h3>VideoCallDashboard</h3>
      <p>user: {id}</p>
      <div className='border'>
        <VideoCallDisplay />
      </div>
      {/* <div>
        <div>content</div>
        <div>rooms</div>
        <div>
          users <ActiveUsersList />
        </div>
      </div> */}
    </div>
  )
}

export default VideoCallDashboard
