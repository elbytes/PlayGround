import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDrawData } from '../../actions/canvasActions'
const styles = {
  canvasBoard: {
    width: '90%',
    height: '90%',
    backgroundColor: '#FFF',
    margin: 'auto',
    border: '1px solid',
    borderRadius: '8px',
  },
}

const CanvasBoard = () => {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth / 2.8}px`
    canvas.style.height = `${window.innerHeight / 2.8}px`
    const ctx = canvas.getContext('2d')
    ctx.scale(5, 8)
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctxRef.current = ctx
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    ctxRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    ctxRef.current.lineTo(offsetX, offsetY)
    ctxRef.current.stroke()
    //dispatch to store
    dispatch(setDrawData({ offsetX, offsetY }))
    //emit drawe happening event to server
  }

  return (
    <div>
      <span>canvas board component</span>
      <canvas
        ref={canvasRef}
        style={styles.canvasBoard}
        id='canvasBoard'
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      ></canvas>
    </div>
  )
}

export default CanvasBoard
