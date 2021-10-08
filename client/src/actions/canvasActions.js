import {
  CANVAS_SET_DRAW,
  CANVAS_SET_COLOR,
  CANVAS_SET_BACKDROP,
  CANVAS_SET_IMAGE,
} from '../constants/canvasConstants'

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

export const setBackDrop = (backdrop) => {
  return { type: CANVAS_SET_BACKDROP, backdrop }
}

export const setImage = (imageId) => {
  return { type: CANVAS_SET_IMAGE, imageId }
}
