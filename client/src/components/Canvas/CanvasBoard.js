import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from 'fabric'
import {
  BsFillTriangleFill,
  BsFillCircleFill,
  BsFillSquareFill,
  BsBrush,
} from 'react-icons/bs'
import { FaEraser } from 'react-icons/fa'
import { v1 as uuid } from 'uuid'
import { setDrawDataAction } from '../../actions/canvasActions'
import { sendDraw } from '../../utils/wsConn/wsConn'
import {
  emitAdd,
  emitModify,
  addObj,
  modifyObj,
} from '../../utils/wsConn/wsConn'
const styles = {
  canvasBoard: {
    width: '90%',
    height: '90%',
    backgroundColor: '#FFF',
    margin: 'auto',
    border: '1px solid',
    borderRadius: '8px',
  },
  btn: {
    border: 'none',
    borderRadius: '2px',
  },
}

const CanvasBoard = (props) => {
  const [canvas, setCanvas] = useState('')
  //receive selected color from color picker > store
  const color = useSelector((state) => state.canvas.color)

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 500,
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
          emitModify(modifiedObj)
        }
      })

      canvas.on('object:moving', function (options) {
        if (options.target) {
          const modifiedObj = {
            obj: options.target,
            id: options.target.id,
          }
          emitModify(modifiedObj)
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
        fill: { color },
      })
      console.log('new rect created')
    } else if (type === 'triangle') {
      object = new fabric.Triangle({ width: 100, height: 100 })
    } else if (type === 'circle') {
      object = new fabric.Circle({ radius: 50 })
    }

    //set an id property on the object
    object.set({ id: uuid() })
    //add obj to canvas
    canvas.add(object)
    canvas.renderAll()
    emitAdd({ obj: object, id: object.id })
  }

  const drawBrush = () => {
    canvas.freeDrawingBrush.color = color
    canvas.freeDrawingBrush.width = 10
    canvas.renderAll()
  }

  const erase = () => {
    canvas.clear()
  }
  return (
    <div>
      <span>canvas board component</span>
      <div className={styles.canvasBoard}>
        <button
          type='button'
          name='circleBrush'
          className={styles.btn}
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
          square
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
        <canvas id='canv'></canvas>
      </div>
    </div>
  )
}

export default CanvasBoard
