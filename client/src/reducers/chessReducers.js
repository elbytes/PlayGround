import {
  CALL_SET_RECEIVED_MOVE,
  CALL_SET_GAME_STATE_CHANGE,
} from '../constants/chessConstants'

const initialState = {
  opponentMove: '',
  gameState: 'inProgress',
  turn: 'w',
}

export const chessReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALL_SET_RECEIVED_MOVE:
      return { ...state, opponentMove: action.opponentMove }
    case CALL_SET_GAME_STATE_CHANGE:
      return { ...state, gameState: action.gameState }
    default:
      return state
  }
}
