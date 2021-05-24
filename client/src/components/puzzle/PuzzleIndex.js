import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import puzzle from '../../images/puzzle.png'
function PuzzleIndex() {
  return (
    <div>
      <Row>
        <Col>
          <h3>Puzzle Activity Coming Soon!</h3>
        </Col>
        <Col xs={6} md={4}>
          <Image src={puzzle} fluid />
        </Col>
      </Row>
    </div>
  )
}

export default PuzzleIndex
