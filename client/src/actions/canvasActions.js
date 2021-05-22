import { CANVAS_SET_DRAW } from '../constants/canvasConstants'
import { CANVAS_SET_COLOR } from '../constants/canvasConstants'
export const setDrawDataAction = (drawData) => {
  return {
    type: CANVAS_SET_DRAW,
    drawData: drawData,
  }
}

export const setColor = (color) => {
  return {
    type: CANVAS_SET_COLOR,
    color,
  }
}
