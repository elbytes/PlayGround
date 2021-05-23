import { CALL_SET_RECEIVED_MOVE } from '../constants/chessConstants'
import { CALL_SET_GAME_STATE_CHANGE } from '../constants/chessConstants'

//chess action creators
export const setReceivedMoved = (move) => {
  return {
    type: CALL_SET_RECEIVED_MOVE,
    opponentMove: move,
  }
}

export const setGameStateChange = (gameState) => {
  return {
    type: CALL_SET_GAME_STATE_CHANGE,
    gameState: gameState,
  }
}
