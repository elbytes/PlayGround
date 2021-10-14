import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import LocalVideoView from './LocalVideoView'
import RemoteVideoView from './RemoteVideoView'
import CallRejected from '../CallRejected/CallRejected'
import IncomingCallDialogue from '../IncomingCallDialogue/IncomingCallDialogue'
import CallingDialogue from '../CallingDialogue/CallingDialogue'
import { callStates } from '../../constants/callConstants'
import {
  setCallRejected,
  setLocalCamEnabled,
  setLocalMicEnabled,
  setMessage,
} from '../../actions/callActions'
import ConversationBtns from '../Videocall/ConversationBtns/ConversationBtns'
import Chat from '../Chat/Chat'

const styles = {
  verticalMArgin: {
    position: 'relative',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
    paddingBottom: '0.5rem',
  },

  local: {
    position: 'relative',
    width: '30%',
    height: '30%',
    top: '0',
    right: '2rem',
    borderRadius: '2rem',
  },
  localInitial: {
    position: 'relative',
    width: '50%',
    height: '50%',
    top: '0',
    right: '1rem',
    borderRadius: '2rem',
  },
  remote: { width: '100%', height: '100%', position: 'relative' },
}
const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogueVisibile,
    callRejected,
    hideCallRejectedDialog,
    message,
    setDirectCallMessage,
  } = props

  return (
    <div className='container-fluid'>
      <Row style={styles.verticalMArgin}>
        {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
          <Col style={styles.remote}>
            <RemoteVideoView remoteStream={remoteStream} />
          </Col>
        )}
        {remoteStream &&
          localStream &&
          callState === callStates.CALL_IN_PROGRESS && (
            <Col style={styles.local} className='fluid'>
              <LocalVideoView localStream={localStream} />
            </Col>
          )}

        {localStream && !remoteStream && (
          <Col style={styles.localInitial} className='fluid'>
            <LocalVideoView localStream={localStream} />
          </Col>
        )}
      </Row>
      <Row style={styles.verticalMArgin}>
        <Col>
          {callRejected.rejected && (
            <CallRejected
              reason={callRejected.reason}
              hideCallRejectedDialog={hideCallRejectedDialog}
            />
          )}
        </Col>
      </Row>
      <Row style={styles.verticalMArgin}>
        <Col>
          {callState === callStates.CALL_REQUESTED && (
            <IncomingCallDialogue callerUsername={callerUsername} />
          )}
        </Col>
      </Row>
      <Row style={styles.verticalMArgin}>
        <Col>{callingDialogueVisibile && <CallingDialogue />}</Col>
      </Row>
      <Row style={styles.verticalMArgin}>
        <Col>
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <ConversationBtns {...props} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <Chat
              setDirectCallMessage={setDirectCallMessage}
              message={message}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCamEnabled: (enabled) => dispatch(setLocalCamEnabled(enabled)),
    setMicEnabled: (enabled) => dispatch(setLocalMicEnabled(enabled)),
    setDirectCallMessage: (received, content) =>
      dispatch(setMessage(received, content)),
  }
}
function mapStoreStateToProps({ call }) {
  return { ...call }
}
export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall)
