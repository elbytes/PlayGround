import React, { useState } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import book from '../../images/book.png'
import Book from '../Books/Book'
import { bookList } from './books_data/bookList'
import pic from '../../../../client/src/components/Books/books_data/covers/c_01.jpg'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { emitOpenBook } from '../../utils/wsConn/wsConn'
import BookItem from './BookItem'
const BookIndex = () => {
  const [isReading, setIsReading] = useState(false)

  let bookDataToSendToServer = {
    socket: connectedUserSocketId,
    data: 'bookIndex',
  }
  const createBookItem = (bookItem) => {
    return (
      <BookItem
        key={bookItem.id}
        name={bookItem.name}
        imgUrl={bookItem.imgUrl}
      />
    )
  }
  const handleOpenBook = (index) => {
    setIsReading(true)
    emitOpenBook(bookDataToSendToServer)
  }
  return (
    <div>
      <Row>
        <Col>{bookList.map(createBookItem)}</Col>
        <Col>{pic}</Col>
      </Row>
    </div>
  )
}

export default BookIndex
