import { CANVAS_SET_DRAW } from '../constants/canvasConstants'

export const setDrawData = (drawData) => {
  return {
    type: CANVAS_SET_DRAW,
    drawData,
  }
}
