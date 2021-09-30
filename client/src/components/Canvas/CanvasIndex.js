import React from 'react'
import ColorPicker from './ColorPicker'
import FabricCanvasBoard from './FabricCanvasBoard'

export const CanvasIndex = () => {
  const onColorPicked = (hex) => {
    return hex
  }

  return (
    <div>
      <ColorPicker onColorPicked={onColorPicked} />
      <FabricCanvasBoard onColorPicked={onColorPicked} />
    </div>
  )
}

export default CanvasIndex
