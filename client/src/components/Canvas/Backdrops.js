import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { backDropUrls } from './backdropUrls'
const styles = {
  backdropBtn: {},
  backdrop: { width: '100px', margin: '0.5rem' },
}
const Backdrops = () => {
  const [pickerVisible, setPickerVisible] = useState(false)

  const togglePicker = () => {
    setPickerVisible(!pickerVisible)
  }
  return (
    <div>
      <Button onClick={togglePicker} style={styles.backdropBtn} variant='info'>
        Backdrops
      </Button>
      {pickerVisible && (
        <div style={{ margin: '20px' }}>
          <p>Choose a backdrop</p>>
          {backDropUrls.map((backdrop) => (
            <Image src={backdrop.src} style={styles.backdrop} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Backdrops
