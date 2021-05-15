import React, { useRef, useState, useHistory, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { io } from 'socket.io-client'
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler'
import VideoCallDisplay from './VideoCallDisplay'
import NicknameLogin from './NicknameLogin'
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList'
const VideoCallDashboard = ({ id }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream()
    return () => {}
  }, [])

  return (
    <div className='home'>
      <div className='border'>
        <Row>
          <Col>
            {' '}
            <h3>VideoCallDashboard</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='border'></div>
          </Col>
          <Col>
            {' '}
            <div className='border'>
              <VideoCallDisplay />
            </div>
          </Col>
        </Row>

        <div>
          <div>content</div>
          <div>rooms</div>
          <div>
            users <ActiveUsersList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallDashboard
