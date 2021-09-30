import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { fabric } from 'fabric'
import { v1 as uuid } from 'uuid'
import {
  emitAdd,
  emitModify,
  addObj,
  modifyObj,
  setBackDrop,
} from '../../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import { backDropUrls } from './backdropUrls'
import BackDrop from './BackDrop'

const styles = {
  btn: { border: 'none', margin: '0.5rem' },
  canvas: {
    Maxwidth: '1024px',
    minWidth: '320px',
    position: 'relative',
    height: 'auto',
  },
  backDropDiv: { width: '120px', float: 'left' },
}
const FabricCanvasBoard = () => {
  const [canvas, setCanvas] = useState('')
  const color = useSelector((state) => state.canvas.color)
  const [pickerVisible, setPickerVisible] = useState(false)

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 810,
      backgroundColor: 'white',
      border: '1px solid',
    })

  useEffect(() => {
    setCanvas(initCanvas())
  }, [color])

  useEffect(() => {
    if (canvas) {
      canvas.on('object:modified', function (options) {
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: options.target.id,
          }
          let drawDataToSend = {
            socket: connectedUserSocketId,
            drawData: modifiedObj,
          }
          emitModify(drawDataToSend)
        }
      })

      canvas.on('object:moving', function (options) {
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: options.target.id,
          }
          let drawDataToSend = {
            socket: connectedUserSocketId,
            drawData: modifiedObj,
          }
          emitModify(drawDataToSend)
        }
      })

      modifyObj(canvas)
      addObj(canvas)
    }
  }, [canvas])

  const addShape = (e) => {
    let type = e.target.name
    let object

    if (type === 'rectangle') {
      object = new fabric.Rect({
        height: 75,
        width: 150,
        fill: color,
      })
    } else if (type === 'triangle') {
      object = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: color,
      })
    } else if (type === 'circle') {
      object = new fabric.Circle({
        radius: 50,
        fill: color,
      })
    }

    object.set({ id: uuid() })
    canvas.add(object)
    canvas.renderAll()

    let drawDataToSend = {
      object: { obj: object, id: object.id },
      socket: connectedUserSocketId,
    }
    emitAdd(drawDataToSend)
  }

  const addBackground = (url) => {
    fabric.Image.fromURL(url, (img) => {
      canvas.backgroundImage = img
      canvas.renderAll()
    })
  }

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
    // setSelectedBackDrop(backDropId)
    addBackground(`/img/backdrops/000${backDropId}.jpg`)

    //send to server
    let backDropDataToSend = {
      socket: connectedUserSocketId,
      backdrop: backDropId,
    }
    setBackDrop(backDropDataToSend)
  }

  return (
    <div>
      <div>
        <Button onClick={togglePicker} style={styles.btn} variant='info'>
          Backdrops
        </Button>
        {pickerVisible && (
          <div style={{ margin: '20px' }}>
            <p>Choose a backdrop</p>
            {backDropUrls.map((backdrop) => (
              <div onClick={onBackDropSelect} style={styles.backDropDiv}>
                <BackDrop src={backdrop.src} id={backdrop.id} />
              </div>
            ))}
          </div>
        )}
        <div>
          {' '}
          <Button
            type='button'
            name='circle'
            onClick={addShape}
            style={styles.btn}
            variant='primary'
          >
            Add a Circle
          </Button>
          <Button
            type='button'
            name='triangle'
            onClick={addShape}
            style={styles.btn}
            variant='warning'
          >
            Add a Triangle
          </Button>
          <Button
            type='button'
            name='rectangle'
            onClick={addShape}
            style={styles.btn}
            variant='success'
          >
            Add a Rectangle
          </Button>
          <Button
            type='button'
            name='rectangle'
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
    </div>
  )
}

export default FabricCanvasBoard
