import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fabric } from 'fabric'
import { v1 as uuid } from 'uuid'
import {
  emitAdd,
  emitModify,
  addObj,
  modifyObj,
} from '../../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
import bg01 from '../../images/landscapes/0001.jpg'
const FabricCanvasBoard = () => {
  const [canvas, setCanvas] = useState('')
  const color = useSelector((state) => state.canvas.color)
  const [isMousePressed, setIsMousePressed] = useState(false)

  const initCanvas = () =>
    new fabric.Canvas('canv', {
      height: 500,
      width: 810,
      backgroundColor: 'white',
      isDrawingMode: true,
      fill: color,
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

  //   const addBackground = () => {
  //     fabric.Image.fromURL(bg01, (img) => {
  //       canvas.backgroundImage = img
  //       canvas.renderAll()
  //     })
  //   }

  const drawingMode = (canvas) => {
    if (canvas) {
      canvas.on('mouse:move', (event) => {
        canvas.isDrawingMode = true
        canvas.renderAll()
      })
      canvas.on('mouse:down', (event) => {
        setIsMousePressed(true)
        canvas.setCursor('crosshair')
        canvas.renderAll()
      })
      canvas.on('mouse:up', (event) => {
        setIsMousePressed(false)
        canvas.setCursor('default')
        canvas.renderAll()
      })
    }
  }

  return (
    <div>
      <span>fabric</span>
      <div>
        <div>
          <button type='button' name='draw' onClick={drawingMode}>
            draw
          </button>
          <button type='button' name='circle' onClick={addShape}>
            Add a Circle
          </button>

          <button type='button' name='triangle' onClick={addShape}>
            Add a Triangle
          </button>

          <button type='button' name='rectangle' onClick={addShape}>
            Add a Rectangle
          </button>
        </div>

        <div>
          <canvas id='canv' />
        </div>
      </div>
    </div>
  )
}

export default FabricCanvasBoard
