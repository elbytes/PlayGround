import React, { useRef, useEffect } from 'react'
import physics, { putWallsAround, Ball, mainLoop } from './physics'
import { userInput } from './userInput'
import userInfo from './userInput'
const styles = {
  soccerBoard: {
    backgroundColor: '#67f5a7',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    position: 'relative',
  },
}
const SoccerGame = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight0)
  }, [])

  let startX = 40 + Math.random() * 560
  let startY = 40 + Math.random() * 400
  let playerBall = new Ball(startX, startY, 40, 5)
  playerBall.player = true
  playerBall.maxSpeed = 5

  return (
    <div>
      <span>Soccer Game Component</span>
      <canvas ref={canvasRef} style={styles.soccerBoard} />
    </div>
  )
}

export default SoccerGame
