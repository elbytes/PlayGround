import React from 'react'

import BookCover from './BookCover'
function BookItem(props) {
  return (
    <>
      <BookCover imgUrl={props.imgUrl} />
      <h4>{props.name}</h4>
    </>
  )
}

export default BookItem
