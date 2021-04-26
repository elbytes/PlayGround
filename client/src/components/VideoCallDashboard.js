import React, { useRef, useState, useHistory } from 'react'
import { Form, Button } from 'react-bootstrap'
import { io } from 'socket.io-client'
import ActiveUsersList from './ActiveUsersList/ActiveUsersList'
import StartCallBtn from './StartCallBtn'
import * as webRTCHandler from '../utils/webRTC/webRTCHandler'
const VideoCallDashboard = ({ id }) => {
  const iceServers = {
    iceServer: {
      urls: 'stun.l.google.com:19302',
    },
  }
  const [username, setUsername] = useState()

  return (
    <div>
      <h3>VideoCallDashboard</h3>
      <p>user: {id}</p>

      <div>
        <div>content</div>
        <div>rooms</div>
        <div>
          users <ActiveUsersList />
        </div>
      </div>
    </div>
  )
}

export default VideoCallDashboard
