import React from 'react'
import { Image } from 'react-bootstrap'
// import ColorPicker from './ColorPicker'
// import FabricCanvasBoard from './FabricCanvasBoard'
import draw from '../../images/Selection_089.png'

const styles = {
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}
export const CanvasIndex = () => {
  // const onColorPicked = (hex) => {
  //   return hex
  // }

  return (
    <div>
      {/* <h2>Whiteboard</h2> */}
      {/* <ColorPicker onColorPicked={onColorPicked} /> */}
      {/* <FabricCanvasBoard onColorPicked={onColorPicked} /> */}
      <h4>Library activity coming VERY soon</h4>
      <h5>And it's going to look EVEN better than this!</h5>
      {/* <BookItemList /> */}
      <Image src={draw} rounded style={styles.img} />
    </div>
  )
}

export default CanvasIndex
