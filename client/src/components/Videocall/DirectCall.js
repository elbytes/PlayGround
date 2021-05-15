import React from 'react'
import { connect } from 'react-redux'
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
} from '../../actions/callActions'
import ConversationBtns from '../Videocall/ConversationBtns/ConversationBtns'

const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogueVisibile,
    callRejected,
    hideCallRejectedDialog,
  } = props
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejected && (
        <CallRejected
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialogue callerUsername={callerUsername} />
      )}
      {callingDialogueVisibile && <CallingDialogue />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationBtns {...props} />
      )}
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCamEnabled: (enabled) => dispatch(setLocalCamEnabled(enabled)),
    setMicEnabled: (enabled) => dispatch(setLocalMicEnabled(enabled)),
  }
}
function mapStoreStateToProps({ call }) {
  return { ...call }
}
export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall)
