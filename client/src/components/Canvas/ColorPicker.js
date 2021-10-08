import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CirclePicker, CustomPicker } from 'react-color'
import { Image } from 'react-bootstrap'
import { setColor } from '../../actions/canvasActions'
import palette from '../../images/color-palette.png'
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
      width: '60px',
      padding: '0.3rem',
      borderRadius: '0.4rem',
      marginTop: '0',
      cursor: 'pointer',
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
      <div onClick={togglePicker} style={styles.colorPickerBtn}>
        <Image src={palette} />
      </div>
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
