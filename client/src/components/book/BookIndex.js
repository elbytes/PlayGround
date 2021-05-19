import React from 'react'

function BookIndex() {
  const handleOpenBook = () => {}
  return (
    <div>
      <span>Book Reading Component</span>
      <div>
        <span onClick={handleOpenBook}>Peter Rabbit</span>
      </div>
    </div>
  )
}

export default BookIndex
