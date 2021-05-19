import * as chessActions from '../actions/chessActions'
const initialState = {
  move: '',
}

export const chessReducer = (state = initialState, action) => {
  switch (action.type) {
    case chessActions.CALL_SET_RECEIVED_MOVE:
      return { ...state, move: action.move }
    default:
      return state
  }
}
