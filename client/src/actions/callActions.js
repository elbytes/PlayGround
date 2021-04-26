import { CALL_SET_LOCAL_STREAM } from '../constants/callConstants'

export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  }
}
