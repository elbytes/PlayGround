import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoteVideoView from './RemoteVideoView'
import CallRejected from '../CallRejected/CallRejected'
import IncomingCallDialogue from '../IncomingCallDialogue/IncomingCallDialogue'
import CallingDialogue from '../CallingDialogue/CallingDialogue'
import { callStates } from '../../constants/callConstants'
import { setCallRejected } from '../../actions/callActions'
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
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
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
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
  }
}
function mapStoreStateToProps({ call }) {
  return { ...call }
}
export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall)
