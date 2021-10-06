import React from 'react'
import ColorPicker from './ColorPicker'
import { Row, Col } from 'react-bootstrap'
import FabricCanvasBoard from './FabricCanvasBoard'

export const CanvasIndex = () => {
  const onColorPicked = (hex) => {
    return hex
  }

  return (
    <div>
      <Row>
        <Col>
          <ColorPicker onColorPicked={onColorPicked} />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <FabricCanvasBoard />
        </Col>
      </Row>
    </div>
  )
}

export default CanvasIndex
