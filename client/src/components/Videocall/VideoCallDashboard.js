import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Alert, Image } from 'react-bootstrap'
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler'
import VideoCallDisplay from './VideoCallDisplay'
import CanvasIndex from '../Canvas/CanvasIndex'
import ChessIndex from '../Chess/ChessIndex'
import PuzzleIndex from '../puzzle/PuzzleIndex'
import BookIndex from '../Book/BookIndex'
import ActivityListScreen from '../../screens/ActivityListScreen'
import { callStates } from '../../constants/callConstants'
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList'
import SearchUsers from '../SearchUsers/SearchUsers'
import { StartingActivity } from '../StartingActivity'
import image from '../../images/08.jpeg'
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
  const callState = useSelector((state) => state.call.callState)
  const remoteStream = useSelector((state) => state.call.remoteStream)

  console.log(selectedActivity)
  useEffect(() => {
    webRTCHandler.getLocalStream()
    return () => {}
  }, [])

  return (
    <div className='home'>
      <div className='border'>
        <Row style={styles.verticalMArgin}>
          {callState === callStates.CALL_IN_PROGRESS && (
            <Col>
              <div className='border'>
                {remoteStream && selectedActivity.activity === 'chess' && (
                  <ChessIndex />
                )}
                {remoteStream && selectedActivity.activity === 'draw' && (
                  <CanvasIndex />
                )}
                {remoteStream && selectedActivity.activity === 'book' && (
                  <BookIndex />
                )}
                {remoteStream && selectedActivity.activity === 'puzzle' && (
                  <PuzzleIndex />
                )}
                {remoteStream && selectedActivity.activity === '' && (
                  <StartingActivity />
                )}
                {!remoteStream && (
                  <div>
                    <p style={{ fontSize: '2rem' }}>Get Excited!</p>
                    <Image rounded fluid src={image} />
                  </div>
                )}
              </div>
            </Col>
          )}

          {callState === callStates.CALL_REQUESTED && (
            <Col>
              <p style={{ fontSize: '2rem' }}>Get Excited!</p>
              <Image src={image} fluid />
            </Col>
          )}
          {callState === callStates.CALL_AVAILABLE && (
            <Col>
              <h2>
                To start a PlayGround, choose a friend to connect to from the
                Active Users List.
              </h2>
              <div className='py-4'>
                <SearchUsers />
              </div>

              <h4>Active users</h4>
              <ActiveUsersList />
            </Col>
          )}
          <Col>
            <Row style={styles.verticalMArgin}>
              {remoteStream ? (
                <ActivityListScreen />
              ) : (
                <Col>
                  <Alert variant='info'>
                    To start an activity, connect with a friend first
                  </Alert>
                </Col>
              )}
            </Row>
            <Row style={styles.verticalMArgin}>
              <Col className='border'>
                <VideoCallDisplay />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default VideoCallDashboard
