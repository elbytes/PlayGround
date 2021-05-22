import { CALL_SET_RECEIVED_MOVE } from '../constants/chessConstants'

//chess action creator
export const setReceivedMoved = (move) => {
  return {
    type: CALL_SET_RECEIVED_MOVE,
    opponentMove: move,
  }
}
