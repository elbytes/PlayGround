import React from 'react'
import DirectCall from './DirectCall'
import { Row, Col } from 'react-bootstrap'
const VideoCallDisplay = () => {
  return (
    <div>
      <p>VideoCallDisplay</p>
      <Row>
        <Col>
          <DirectCall />
        </Col>
      </Row>
    </div>
  )
}

export default VideoCallDisplay
