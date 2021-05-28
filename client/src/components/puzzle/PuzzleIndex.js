import React from 'react'
import { Image, Row, Col } from 'react-bootstrap'
import puzzle from '../../images/puzzle.png'

const styles = {
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}
function PuzzleIndex() {
  return (
    <div>
      <Row>
        <Col>
          <h3>Puzzle Activity Coming Soon!</h3>
        </Col>
        <Col xs={6} md={4}>
          <Image src={puzzle} fluid style={styles.img} />
        </Col>
      </Row>
    </div>
  )
}

export default PuzzleIndex
