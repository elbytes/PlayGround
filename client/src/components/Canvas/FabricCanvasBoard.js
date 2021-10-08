import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Image, Row, Col } from 'react-bootstrap'
import { fabric } from 'fabric'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { backDropUrls } from './backdropUrls'
import { imageUrls } from './imageUrls'
import BackDrop from './BackDrop'
import { setBackDrop, setImage } from '../../actions/canvasActions'
import { emitSetBackDrop, emitImageAdd } from '../../utils/wsConn/wsConn'
import backdropIcon from '../../images/background.png'
import add from '../../images/add.png'
import pencil from '../../images/pencil.png'
import eraser from '../../images/eraser.png'
import ColorPicker from './ColorPicker'

const styles = {
  btn: { border: 'none', margin: '0.5rem', cursor: 'pointer' },
  canvas: {
    Maxwidth: '1024px',
    minWidth: '320px',
    position: 'relative',
    height: 'auto',
  },
  backDropDiv: { width: '120px', float: 'left', cursor: 'pointer' },
}

const FabricCanvasBoard = () => {
  const dispatch = useDispatch()
  const [canvas, setCanvas] = useState('')
  const [freeDrawing, setFreeDrawing] = useState(false)
  const [brushWidth, setBrushWidth] = useState(10)
  const color = useSelector((state) => state.canvas.color)
  const imageId = useSelector((state) => state.canvas.imageId)
  const [pickerVisible, setPickerVisible] = useState(false)
  const [imagePickerVisible, setImagePickerVisible] = useState(false)
  const backdrop = useSelector((state) => state.canvas.backdrop)

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 810,
      backgroundColor: 'white',
      border: '1px solid',
      allowTouchScrolling: 'false',
      isDrawingMode: false,
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

  const addImage = useCallback(
    (imageId) => {
      if (canvas && imageId) {
        fabric.Image.fromURL(`./img/canvasImages/${imageId}.svg`, function (oImg) {
        canvas.add(oImg)
      })
      }
    },
    //eslint-disable-next-line
    [imageId, canvas]
  )
  
  const addShape = (shapeType) => {
    let shape
    if (shapeType === 'circle') {
      shape = new fabric.Circle({
        radius: 50,
        fill: color,
      })
    }
    if (shapeType === 'rectangle') {
      shape = new fabric.Rect({
        width: 50,
        height: 50,
        fill: color,
      })
    }
    if (shapeType === 'triangle') {
      shape = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: color,
      })
    }
    canvas.add(shape)
    canvas.renderAll()
  }

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  const onColorPicked = (hex) => {
    return hex
  }

  const togglePicker = () => {
    setPickerVisible(!pickerVisible)
  }

  const toggleImagePicker = () => {
    setImagePickerVisible(!imagePickerVisible)
  }

  // const addImage = (imageId) => {
  //     fabric.Image.fromURL(`./img/canvasImages/${imageId}.svg`, function (oImg) {
  //     canvas.add(oImg)
  //   })
  //   toggleImagePicker()
  //   //send to store
  //   dispatch(setImage(imageId))
  //   //send to server
  //   let imageDataToSend = {
  //     socket: connectedUserSocketId,
  //     imageId: imageId,
  //   }
  //   emitImageAdd(imageDataToSend)
  //   }


  useEffect(() => {
    addBackground(`/img/backdrops/${backdrop}.jpg`)
  }, [backdrop, addBackground])

  useEffect(() => {
    addImage(imageId)
  }, [addImage, imageId])
  
  // useEffect(() => {
  //   addImage(imageId)
  // }, [imageId, addImage])


  const handleBrushChange = (e) => {
    setBrushWidth(e.target.value)
  }

  

  const freeDraw = () => {
    canvas.isDrawingMode = !canvas.isDrawingMode
    setFreeDrawing(!freeDrawing)

    if (canvas.isDrawingMode) {
      let brush = canvas.freeDrawingBrush
      brush.color = color
      brush.width = brushWidth
    }
    canvas.renderAll()
    canvas.isDrawingMode = !canvas.isDrawingMode
    setFreeDrawing(!freeDrawing)
  }


  const onBackDropSelect = (e) => {
    let backDropId = e.target.id
    togglePicker()
    //send to store
    dispatch(setBackDrop(backDropId))
    //send to server
    let backDropDataToSend = {
      socket: connectedUserSocketId,
      backdrop: backDropId,
    }
    emitSetBackDrop(backDropDataToSend)
  }

  const onImageSelect = (e) => {
    let imageId = e.target.id
    toggleImagePicker()
    //send to store
    dispatch(setImage(imageId))
    //send to server
    let imageDataToSend = { socket: connectedUserSocketId, imageId: imageId }
    emitImageAdd(imageDataToSend)
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
        <Col>
          <Image
            src={add}
            onClick={toggleImagePicker}
            style={{ cursor: 'pointer' }}
          />
        </Col>
        <Col>
          <Image
            src={pencil}
            style={styles.btn}
            onClick={() => {
              freeDraw()
            }}
          />
          {freeDrawing && (
            <div style={{ marginTop: '2rem' }}>
              <input
                type='range'
                min={1}
                max={100}
                value={brushWidth}
                onChange={(e) => {
                  handleBrushChange(e)
                }}
              />
            </div>
          )}
        </Col>
        <Col>
          <Image
            src={eraser}
            style={styles.btn}
            onClick={() => {
              canvas.clear()
            }}
          />
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
          {imagePickerVisible && (
            <div>
              {imageUrls.map((image) => (
                <div
                  onClick={onImageSelect}
                  style={styles.backDropDiv}
                  key={image.id}
                >
                  <BackDrop src={image.src} id={image.id} />
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
      <div>
        <div>
          <Button
            type='button'
            onClick={() => {
              addShape('circle')
            }}
          >
            Add a Circle
          </Button>
          <Button
            type='button'
            style={styles.btn}
            variant='warning'
            onClick={() => {
              addShape('triangle')
            }}
          >
            Add a Triangle
          </Button>
          <Button
            style={styles.btn}
            variant='success'
            onClick={() => {
              addShape('rectangle')
            }}
          >
            Add a Rectangle
          </Button>
          <Button
            type='button'
            onClick={() => {
              console.log('object');
            }}
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
