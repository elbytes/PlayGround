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
import { setReceivedMoved } from '../../actions/chessActions'
import ConversationBtns from '../Videocall/ConversationBtns/ConversationBtns'
import Chat from '../Chat/Chat'

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
    <>
      <Row>
        <Col>
          <LocalVideoView localStream={localStream} />
        </Col>
        <Col>
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <RemoteVideoView remoteStream={remoteStream} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {callRejected.rejected && (
            <CallRejected
              reason={callRejected.reason}
              hideCallRejectedDialog={hideCallRejectedDialog}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {callState === callStates.CALL_REQUESTED && (
            <IncomingCallDialogue callerUsername={callerUsername} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>{callingDialogueVisibile && <CallingDialogue />}</Col>
      </Row>
      <Row>
        <Col>
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <ConversationBtns {...props} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Chat setDirectCallMessage={setDirectCallMessage} message={message} />
        </Col>
      </Row>
    </>
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
