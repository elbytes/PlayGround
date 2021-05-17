import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import { Button } from 'react-bootstrap'

function ColorPicker(props) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickedColor, setPickedColor] = useState('#eb7134')

  const styles = {
    colorPickerBtn: {
      backgroundColor: pickedColor,
      border: 'none',
      margin: '0.5rem',
      alignItems: 'center',
    },
  }

  const togglePicker = () => {
    setPickerVisible(!pickerVisible)
  }
  const handleColorChange = ({ hex }) => {
    console.log(hex)
    setPickedColor(hex)
    //pass the picked color to CanvasIndex
    props.onColorPicked(hex)
    setPickerVisible(!pickerVisible)
  }

  return (
    <div>
      <span>Color picker component</span>
      <br />
      <Button onClick={togglePicker} style={styles.colorPickerBtn}>
        Colors
      </Button>
      {pickerVisible && (
        <div style={{ margin: '20px' }}>
          <CirclePicker
            color={pickedColor}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
