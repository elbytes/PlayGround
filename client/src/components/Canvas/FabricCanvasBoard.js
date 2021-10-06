import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Image, Row, Col } from 'react-bootstrap'
import { fabric } from 'fabric'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { backDropUrls } from './backdropUrls'
import BackDrop from './BackDrop'
import { setBackDrop } from '../../actions/canvasActions'
import { emitSetBackDrop } from '../../utils/wsConn/wsConn'
import backdropIcon from '../../images/background.png'
import ColorPicker from './ColorPicker'

const styles = {
  btn: { border: 'none', margin: '0.5rem', cursor: 'pointer' },
  canvas: {
    Maxwidth: '1024px',
    minWidth: '320px',
    position: 'relative',
    height: 'auto',
  },
  backDropDiv: { width: '120px', float: 'left' },
}

const FabricCanvasBoard = () => {
  const dispatch = useDispatch()
  const [canvas, setCanvas] = useState('')
  const color = useSelector((state) => state.canvas.color)
  const [pickerVisible, setPickerVisible] = useState(false)
  const backdrop = useSelector((state) => state.canvas.backdrop)

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 810,
      backgroundColor: 'white',
      border: '1px solid',
    })

  const addBackground = useCallback(
    (url) => {
      if (canvas && backdrop) {
        fabric.Image.fromURL(url, (img) => {
          canvas.backgroundImage = img
          canvas.renderAll()
        })
      }
    },
    [backdrop, canvas]
  )

  useEffect(() => {
    setCanvas(initCanvas())
  }, [color])

  const onColorPicked = (hex) => {
    return hex
  }

  useEffect(() => {
    addBackground(`/img/backdrops/000${backdrop}.jpg`)
  }, [backdrop, addBackground])

  const addImage = () => {
    fabric.Image.fromURL('./img/canvasImages/1424456139.svg', function (oImg) {
      canvas.add(oImg)
    })
  }

  const togglePicker = () => {
    setPickerVisible(!pickerVisible)
  }

  const onBackDropSelect = (e) => {
    let backDropId = e.target.id
    togglePicker()
    addBackground(`/img/backdrops/000${backDropId}.jpg`)
    //send to store
    dispatch(setBackDrop(backDropId))
    //send to server
    let backDropDataToSend = {
      socket: connectedUserSocketId,
      backdrop: backDropId,
    }
    emitSetBackDrop(backDropDataToSend)
  }

  return (
    <>
      <Row>
        <Col>
          <ColorPicker onColorPicked={onColorPicked} />
        </Col>
        <Col>
          <Image
            src={backdropIcon}
            onClick={togglePicker}
            style={styles.btn}
            variant='info'
          ></Image>
        </Col>
      </Row>
      <Row>
        <Col>
          {pickerVisible && (
            <div style={{ margin: '20px' }}>
              {backDropUrls.map((backdrop) => (
                <div
                  onClick={onBackDropSelect}
                  style={styles.backDropDiv}
                  key={backdrop.id}
                >
                  <BackDrop src={backdrop.src} id={backdrop.id} />
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
      <div>
        <div>
          {' '}
          <Button type='button'>Add a Circle</Button>
          <Button type='button' style={styles.btn} variant='warning'>
            Add a Triangle
          </Button>
          <Button name='rectangle' style={styles.btn} variant='success'>
            Add a Rectangle
          </Button>
          <Button
            type='button'
            onClick={addImage}
            style={styles.btn}
            variant='success'
          >
            Add something else
          </Button>
        </div>
      </div>
      <div style={styles.canvas}>
        <canvas id='canv' />
      </div>
    </>
  )
}

export default FabricCanvasBoard
