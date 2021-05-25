import React from 'react'
import { Image } from 'react-bootstrap'
function BookCover(props) {
  return (
    <div>
      <Image src={props.imgUrl} />
    </div>
  )
}

export default BookCover
