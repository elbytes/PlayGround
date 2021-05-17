import { setDrawData } from '../actions/canvasActions'

const initState = {
  drawData: '',
}

export const canvasReducer = (state = initState, action) => {
  switch (action.type) {
    case setDrawData.CANVAS_SET_DRAW:
      return { ...state, drawData: action.drawData }
    default:
      return state
  }
}
