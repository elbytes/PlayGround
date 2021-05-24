import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import book from '../../images/book.png'
function BookIndex() {
  const handleOpenBook = () => {}
  return (
    <div>
      <Row>
        <Col>
          <h3>Book Reading Activity Coming Soon</h3>
        </Col>
        <Col>
          <Image src={book} fluid />
        </Col>
      </Row>
    </div>
  )
}

export default BookIndex
