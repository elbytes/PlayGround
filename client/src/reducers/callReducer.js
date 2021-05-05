import * as callActions from '../constants/callConstants'
const initState = {
  localStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE,
}

export const callReducer = (state = {}, action) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return { ...state, localStream: action.localStream }
    case callActions.CALL_SET_CALL_STATE:
      return { ...state, callState: action.callState }
    default:
      return state
  }
}
