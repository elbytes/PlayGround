import React, { useRef, useState, useHistory, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { io } from 'socket.io-client'
import { CgMenuGridO } from 'react-icons/cg'
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler'
import VideoCallDisplay from './VideoCallDisplay'
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList'
import CanvasIndex from '../Canvas/CanvasIndex'
import ChessIndex from '../Chess/ChessIndex'
import PuzzleIndex from '../puzzle/PuzzleIndex'
import BookIndex from '../Books/BookIndex'
import ActivityListScreen from '../../screens/ActivityListScreen'
import { callStates } from '../../constants/callConstants'

const styles = {
  menu: {
    cursor: 'pointer',
  },
  verticalMArgin: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
}
const VideoCallDashboard = ({ id }) => {
  const selectedActivity = useSelector((state) => state.call.activity)

  useEffect(() => {
    webRTCHandler.getLocalStream()
    return () => {}
  }, [selectedActivity])

  return (
    <div className='home'>
      <div className='border'>
        <Row></Row>
        <Row style={styles.verticalMArgin}>
          <Col>
            <div className='border'>
              <ChessIndex />
            </div>
          </Col>
          <Col>
            <Row style={styles.verticalMArgin}>
              <Col>
                <div className='border'>
                  <VideoCallDisplay />
                </div>
              </Col>
            </Row>
            <Row style={styles.verticalMArgin}>
              <Col>
                <ActivityListScreen />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {callStates.CALL_AVAILABLE ? (
                <ActiveUsersList />
              ) : (
                <span>Call</span>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default VideoCallDashboard
