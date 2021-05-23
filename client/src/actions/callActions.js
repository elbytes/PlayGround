import {
  CALL_SET_CALL_STATE,
  CALL_SET_LOCAL_STREAM,
  CALL_SET_CALLING_DIALOGUE_VISIBLE,
  CALL_SET_CALLER_USERNAME,
  CALL_SET_CALL_REJECTED,
  CALL_SET_REMOTE_STREAM,
  CALL_SET_LOCAL_MIC_ENABLED,
  CALL_SET_LOCAL_CAM_ENABLED,
  CALL_SET_CHAT_MESSAGE,
  CALL_SET_ACTIVITY,
} from '../constants/callConstants'
import callStates from '../constants/callConstants'

//call action creators
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

export const setCallingDialogueVisibile = (visible) => {
  return {
    type: CALL_SET_CALLING_DIALOGUE_VISIBLE,
    visible,
  }
}

export const setCallerUsername = (callerUsername) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUsername,
  }
}

export const setCallRejected = (callRejectedDetails) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason,
    },
  }
}

export const setRemoteStream = (remoteStream) => {
  return {
    type: CALL_SET_REMOTE_STREAM,
    remoteStream,
  }
}

export const setLocalMicEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_MIC_ENABLED,
    enabled,
  }
}

export const setLocalCamEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_CAM_ENABLED,
    enabled,
  }
}

//chat action creator
export const setMessage = (messageReceived, messageContent) => {
  return {
    type: CALL_SET_CHAT_MESSAGE,
    message: {
      received: messageReceived,
      content: messageContent,
    },
  }
}

//setting chosen activity
export const setActivity = (activity) => {
  return {
    type: CALL_SET_ACTIVITY,
    activity: {
      socket: activity.socket,
      activity: activity.activity,
    },
  }
}
