import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'

const styles = {
  title: { marginTop: '1rem' },
  cover: { width: '50px', height: 'auto' },
}
const BookItem = (props) => {
  return (
    <div>
      <Row>
        <Col>
          <Image src={props.img} rounded id={props.id} styles={styles.cover} />
          <h5 style={styles.title}>{props.name}</h5>
        </Col>
      </Row>
    </div>
  )
}

export default BookItem
