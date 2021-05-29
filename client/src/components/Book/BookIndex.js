import React from 'react'
import { Image } from 'react-bootstrap'
// import BookItemList from './BookItemList'
import library from '../../images/Selection_088.png'

const styles = {
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}
const BookIndex = () => {
  return (
    <div>
      <h4>Library activity coming VERY soon</h4>
      <h5>And this is what it's going to look like!</h5>
      {/* <BookItemList /> */}
      <Image src={library} rounded style={styles.img} />
    </div>
  )
}

export default BookIndex
