import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import BookItem from './BookItem'
import { bookCoverList } from './bookData/bookCoverList'
import { bookNameList } from './bookData/bookNameList'
import Book from './Book'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { emitBookSelection } from '../../utils/wsConn/wsConn'
import store from '../../store'

const styles = { book: { cursor: 'pointer' } }
const BookItemList = () => {
  let selectedBookFromStore = ''
  selectedBookFromStore = useSelector((state) => state.book.bookSelected)
  const [selectedBook, setSelectedBook] = useState('')

  const createBookItemCard = (bookName) => {
    const onBookSelected = (e) => {
      setSelectedBook(e.target.id)
      store.dispatch(setSelectedBook(selectedBook))
      const bookSelectedDatToSend = {
        socket: connectedUserSocketId,
        bookSelected: e.target.id,
      }
      emitBookSelection(bookSelectedDatToSend)
      //
    }

    return (
      <>
        <div onClick={onBookSelected} value={bookName.id} style={styles.book}>
          <BookItem
            key={bookName.id}
            name={bookName.name}
            img={bookCoverList[bookName.id].src}
            id={bookName.id}
          />
        </div>
      </>
    )
  }

  useEffect(() => {
    setSelectedBook(selectedBookFromStore)
  }, [selectedBookFromStore])

  return (
    <div>
      {selectedBook === '' ? (
        bookNameList.map(createBookItemCard)
      ) : (
        <Book id={selectedBook} />
      )}
    </div>
  )
}

export default BookItemList
