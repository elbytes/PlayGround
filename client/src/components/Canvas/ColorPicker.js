import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CirclePicker } from 'react-color'
import { Button } from 'react-bootstrap'
import { setColor } from '../../actions/canvasActions'
function ColorPicker(props) {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickedColor, setPickedColor] = useState('#eb7134')
  const dispatch = useDispatch()
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
    //dispatch to store
    dispatch(setColor(hex))
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
