import React from 'react'
import { Image } from 'react-bootstrap'
function Book() {
  const onBookClicked = (e) => {}

  return (
    <div>
      <Image onClick={onBookClicked}></Image>
    </div>
  )
}

export default Book
