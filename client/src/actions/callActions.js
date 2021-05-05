import {
  CALL_SET_CALL_STATE,
  CALL_SET_LOCAL_STREAM,
} from '../constants/callConstants'
import callStates from '../constants/callConstants'

export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  }
}

export const setCallState = (callState) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState,
  }
}
