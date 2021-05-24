import React from 'react'
import ColorPicker from './ColorPicker'
import CanvasBoard from './CanvasBoard'

export const CanvasIndex = () => {
  const onColorPicked = (hex) => {
    return hex
  }

  return (
    <div>
      <h2>Whiteboard</h2>
      <ColorPicker onColorPicked={onColorPicked} />
      <CanvasBoard onColorPicked={onColorPicked} />
    </div>
  )
}

export default CanvasIndex
