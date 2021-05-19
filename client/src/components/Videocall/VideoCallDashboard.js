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
import ActivityListScreen from '../../screens/ActivityListScreen'
import Chat from '../Chat/Chat'
import { callStates } from '../../constants/callConstants'
const styles = {
  menu: {
    cursor: 'pointer',
  },
}
const VideoCallDashboard = ({ id }) => {
  const [activityMenuVisible, setActivityMenuVisible] = useState(false)
  const selectedActivity = useSelector((state) => state.activity)

  useEffect(() => {
    webRTCHandler.getLocalStream()
    logging()
    return () => {}
  }, [selectedActivity])

  const handleActivityMenuClicked = (e) => {
    console.log('activity menu clicked')
    setActivityMenuVisible(!activityMenuVisible)
  }

  const logging = () => {
    console.log('log')
  }

  return (
    <div className='home'>
      <div className='border'>
        <Row>
          <Col>
            <CgMenuGridO
              size='2em'
              onClick={handleActivityMenuClicked}
              style={styles.menu}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='border'>
              {/* {activityMenuVisible && <ActivityListScreen />} */}
              {/* {selectedActivity && <CanvasIndex />} */}
              <ChessIndex />
            </div>
          </Col>
          <Col>
            <Row>
              <Col>
                <div className='border'>
                  <VideoCallDisplay />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row></Row>
        <div>
          <div>
            Active Users: <ActiveUsersList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCallDashboard
