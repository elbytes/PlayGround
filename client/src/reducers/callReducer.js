import * as callActions from '../constants/callConstants'

const initState = {
  localStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE,
  callingDialogueVisibile: false,
  callerUsername: '',
  callRejected: {
    rejected: false,
    reason: '',
  },
  remoteStream: null,
  localCamEnabled: true,
  localMicEnabled: true,
  message: {
    received: false,
    content: '',
  },
  activity: 'draw',
}

export const callReducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.CALL_SET_LOCAL_STREAM:
      return { ...state, localStream: action.localStream }
    case callActions.CALL_SET_CALL_STATE:
      return { ...state, callState: action.callState }
    case callActions.CALL_SET_CALLING_DIALOGUE_VISIBLE:
      return { ...state, callingDialogueVisibile: action.visibile }
    case callActions.CALL_SET_CALLER_USERNAME:
      return { ...state, callerUsername: action.callerUsername }
    case callActions.CALL_SET_CALL_REJECTED:
      return { ...state, callRejected: action.callRejected }
    case callActions.CALL_SET_REMOTE_STREAM:
      return { ...state, remoteStream: action.remoteStream }
    case callActions.CALL_SET_LOCAL_CAM_ENABLED:
      return { ...state, localCamEnabled: action.enabled }
    case callActions.CALL_SET_LOCAL_MIC_ENABLED:
      return { ...state, localMicEnabled: action.enabled }
    case callActions.CALL_SET_CHAT_MESSAGE: {
      return { ...state, message: action.message }
    }
    case callActions.CALL_SET_ACTIVITY: {
      return { ...state, activity: action.activity }
    }
    default:
      return state
  }
}

export const setCallingDialogueVisibile = (visibile) => {
  return {
    type: callActions.CALL_SET_CALLING_DIALOGUE_VISIBLE,
    visibile,
  }
}

export const setCallerUsername = (callerUsername) => {
  return {
    type: callActions.CALL_SET_CALLER_USERNAME,
    callerUsername,
  }
}
