import React from 'react'
import { Image } from 'react-bootstrap'
import ColorPicker from './ColorPicker'
import FabricCanvasBoard from './FabricCanvasBoard'
import draw from '../../images/Selection_089.png'

const styles = {
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}
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
