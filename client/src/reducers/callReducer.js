import { CALL_SET_LOCAL_STREAM } from '../constants/callConstants'

const initState = {
  localStream: null,
}

export const callReducer = (state = {}, action) => {
  switch (action.type) {
    case CALL_SET_LOCAL_STREAM:
      return { ...state, localStream: action.localStream }
    default:
      return state
  }
}
