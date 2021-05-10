import {
  setLocalStream,
  setCallState,
  setCallRejected,
} from '../../actions/callActions'
import { callStates } from '../../constants/callConstants'
import {
  setCallingDialogueVisibile,
  setCallerUsername,
} from '../../reducers/callReducer'
import store from '../../store'
import * as wss from '../wsConn/wsConn'

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
}
const defaultConstrains = { video: true, audio: true }

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream))
      store.dispatch(setCallState(callStates.CALL_AVAILABLE))
    })
    .catch((error) => {
      console.log(
        'An error occurred while trying to get access to local media stream.'
      )
      console.log(error)
    })
}

let connectedUserSocketId

export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS))
  store.dispatch(setCallingDialogueVisibile(true))
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  })
}

export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible) {
    connectedUserSocketId = data.callerSocketId
    store.dispatch(setCallerUsername(data.callerUsername))
    store.dispatch(setCallState(callStates.CALL_REQUESTED))
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    })
  }
}

export const acceptIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  })
}

export const rejectIncomingCall = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  })
  resetCallData()
}

export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callStates !== callStates.CALL_AVAILABLE
  ) {
    return false
  } else {
    return true
  }
}

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogueVisibile(false))
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    //send webRTC offer to establish connection
  } else {
    let rejectionReason
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Contact is not able to answer now.'
    } else {
      rejectionReason = 'Call is rejected'
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    )
  }
}

export const resetCallData = () => {
  connectedUserSocketId = null
  store.dispatch(setCallState(callStates.CALL_AVAILABLE))
}
