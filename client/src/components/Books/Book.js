import React from 'react'
import { bookList } from './books_data/bookList'
import { Row, Col, Image } from 'react-bootstrap'
const Book = (props) => {
  const bookIndex = props.bookIndex
  const bookName = bookList[bookIndex]
  const onPrevClickHandler = (e) => {
    console.log('prev clicked')
  }
  const onNextClickHandler = (e) => {
    console.log('next clicked')
  }
  return (
    <>
      <Row>
        <Col>book:{bookName}</Col>
      </Row>
      <Row>
        <Col>image</Col>
      </Row>
      <Row>
        <Col onClick={onPrevClickHandler}>prev</Col>
        <Col>text</Col>
        <Col onClick={onNextClickHandler}>next</Col>
      </Row>

      <Image />
    </>
  )
}

export default Book
