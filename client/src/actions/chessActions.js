export const CALL_SET_RECEIVED_MOVE = 'CALL_SET_RECEIVED_MOVE'

//chess action creator
export const setReceivedMoved = (move) => {
  return {
    type: CALL_SET_RECEIVED_MOVE,
    move,
  }
}
