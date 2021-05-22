import { CALL_SET_RECEIVED_MOVE } from '../constants/chessConstants'

const initialState = {
  opponentMove: '',
}

export const chessReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_SET_RECEIVED_MOVE:
      return { ...state, opponentMove: action.opponentMove }
    default:
      return state
  }
}
