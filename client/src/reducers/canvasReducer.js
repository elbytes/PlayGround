import {
  CANVAS_SET_DRAW,
  CANVAS_SET_COLOR,
  CANVAS_SET_BACKDROP,
  CANVAS_SET_IMAGE,
} from '../constants/canvasConstants'

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
    case CANVAS_SET_BACKDROP:
      return { ...state, backdrop: action.backdrop }

    case CANVAS_SET_IMAGE:
      return { ...state, imageId: action.imageId }

    default:
      return state
  }
}
