import React from 'react'
import { connect } from 'react-redux'
import LocalVideoView from './LocalVideoView'
import RemoteVideoView from './RemoteVideoView'
import CallRejected from '../CallRejected/CallRejected'
import IncomingCallDialogue from '../IncomingCallDialogue/IncomingCallDialogue'
import CallingDialogue from '../CallingDialogue/CallingDialogue'
const DirectCall = (props) => {
  const { localStream, remoteStream } = props
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {<CallRejected />}
      <IncomingCallDialogue />
      <CallingDialogue />
    </>
  )
}

function mapStoreStateToProps({ call }) {
  return { ...call }
}
export default connect(mapStoreStateToProps, null)(DirectCall)
