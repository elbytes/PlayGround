import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CirclePicker, CustomPicker } from 'react-color'
import { Button } from 'react-bootstrap'
import { setColor } from '../../actions/canvasActions'

const ColorPicker = (props) => {
  const [pickerVisible, setPickerVisible] = useState(false)
  const [pickedColor, setPickedColor] = useState('#eb7134')
  const dispatch = useDispatch()
  const canvas = useSelector((state) => state.canvas)
  const { color } = canvas

  useEffect(() => {
    setPickedColor(color)
  }, [color])

  const styles = {
    colorPickerBtn: {
      backgroundColor: pickedColor,
      border: 'none',
      alignItems: 'center',
    },
  }

  const togglePicker = () => {
    setPickerVisible(!pickerVisible)
  }
  const handleColorChange = ({ hex }) => {
    //dispatch to store
    dispatch(setColor(hex))
    togglePicker()
  }

  return (
    <div>
      <br />
      <Button onClick={togglePicker} style={styles.colorPickerBtn}>
        Colors
      </Button>
      {pickerVisible && (
        <div
          style={{
            margin: '15px',
            backgroundColor: 'white',
            borderRadius: '20px',
            width: '16rem',
            padding: '0.5rem',
          }}
        >
          <CirclePicker
            color={pickedColor}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  )
}

export default CustomPicker(ColorPicker)
