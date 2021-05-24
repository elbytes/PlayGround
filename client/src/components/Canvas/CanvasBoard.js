import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from 'fabric'
import { v1 as uuid } from 'uuid'
import { setDrawDataAction } from '../../actions/canvasActions'
import { emitErase, eraseBoard, sendDraw } from '../../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import {
  emitAdd,
  emitModify,
  addObj,
  modifyObj,
} from '../../utils/wsConn/wsConn'
const styles = {
  canvasBoard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    margin: 'auto',
    border: '2px solid',
    borderRadius: '8px',
    borderColor: '#5daffb',
    padding: '1rem',
  },
  btn: {
    border: 'none',
    borderRadius: '2px',
    backgroundColor: 'white',
  },
}

const CanvasBoard = (props) => {
  const [canvas, setCanvas] = useState('')
  //receive selected color from color picker > store
  const color = useSelector((state) => state.canvas.color)
  let ctx
  let prevX = 0
  let currX = 0
  let prevY = 0
  let currY = 0

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 700,
      backgroundColor: 'white',
    })

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

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

    // determine the type of the object to create based on the name attribute from the button that was clicked
    if (type === 'rectangle') {
      console.log('type is rect')
      object = new fabric.Rect({
        height: 75,
        width: 150,
        fill: color,
      })
      console.log('new rect created')
    } else if (type === 'triangle') {
      object = new fabric.Triangle({ width: 100, height: 100, fill: color })
    } else if (type === 'circle') {
      object = new fabric.Circle({ radius: 50, fill: color })
    }

    //set an id property on the object
    object.set({ id: uuid() })
    //add obj to canvas
    canvas.add(object)
    canvas.renderAll()
    let drawDataToSend = {
      object: { obj: object, id: object.id },
      socket: connectedUserSocketId,
    }
    emitAdd(drawDataToSend)
  }

  function drawBrush() {
    ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = color
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
  }

  const erase = () => {
    canvas.clear()
    let eraseObjectToSend = { canvas: canvas, socket: connectedUserSocketId }
    emitErase(eraseObjectToSend)
    eraseBoard(canvas)
  }
  return (
    <div>
      <div>
        <button
          type='button'
          name='circleBrush'
          style={styles.btn}
          onClick={drawBrush}
        >
          brush
        </button>

        <button
          type='button'
          name='rectangle'
          style={styles.btn}
          onClick={addShape}
        >
          rect
        </button>
        <button
          type='button'
          name='circle'
          style={styles.btn}
          onClick={addShape}
        >
          circle
        </button>

        <button
          style={styles.btn}
          type='button'
          name='triangle'
          onClick={addShape}
        >
          triangle
        </button>
        <button style={styles.btn} type='button' name='erase' onClick={erase}>
          erase
        </button>
        <canvas id='canv' style={styles.canvasBoard}></canvas>
      </div>
    </div>
  )
}

export default CanvasBoard
