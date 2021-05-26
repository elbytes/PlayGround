import { CANVAS_SET_DRAW } from '../constants/canvasConstants'
import { CANVAS_SET_COLOR } from '../constants/canvasConstants'
const initState = {
  color: 'black',
}

export const canvasReducer = (state = initState, action) => {
  switch (action.type) {
    case CANVAS_SET_DRAW:
      return {
        ...state,
        drawData: action.drawData,
      }
    case CANVAS_SET_COLOR:
      return {
        ...state,
        color: action.color,
      }
    default:
      return state
  }
}
