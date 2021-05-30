import React from 'react'
import { Image } from 'react-bootstrap'
const styles = {
  backdrop: { width: '100px', height: 'auto', margin: '0.5rem' },
}
const BackDrop = (props) => {
  return <Image src={props.src} style={styles.backdrop} id={props.id} />
}

export default BackDrop
