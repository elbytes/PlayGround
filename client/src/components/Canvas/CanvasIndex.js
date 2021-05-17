import React from 'react'
import ColorPicker from './ColorPicker'
import CanvasBoard from './CanvasBoard'
export const CanvasIndex = () => {
  const logging = (hex) => {
    console.log(hex)
  }
  return (
    <div>
      <span>Canvas Component</span>
      <ColorPicker onColorPicked={logging} />
      <CanvasBoard />
    </div>
  )
}

export default CanvasIndex
