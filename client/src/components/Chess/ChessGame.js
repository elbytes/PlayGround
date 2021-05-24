import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Chess from 'chess.js'
import Chessboard from 'chessboardjsx'
import {
  sendMove,
  sendGameState,
  dropOpponentMove,
} from '../../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
function ChessGame() {
  const [fen, setFen] = useState('start')
  const [gameState, setGameState] = useState('inProgress')

  const opponentMove = useSelector((state) => state.chess.opponentMove)
  console.log(opponentMove)
  let game = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    game.current = new Chess()
  }, [])

  let gameStateDataToSend = {
    socket: connectedUserSocketId,
    gameState: gameState,
  }
  if (game.current && game.current.in_check()) {
    setGameState('inCheck')
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_checkmate()) {
    setGameState('inCheckmate')
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_draw()) {
    setGameState('inDraw')
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_stalemate()) {
    setGameState('stalemate')
    sendGameState(gameStateDataToSend)
  }
  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({ from: sourceSquare, to: targetSquare })
    //check legal moves
    //move function returns null for illegal moves
    if (move === null) return
    //fen string
    setFen(game.current.fen())
    //send move to server
    let dataToSend = { socket: connectedUserSocketId, move: move }
    console.log(dataToSend)
    sendMove(dataToSend)
    dropOpponentMove(game)
    setFen(game.current.fen())
    console.log(fen)
  }

  const onDropFromStore = () => {
    console.log('opponentMove from ChessGame', opponentMove.to)
    let sourceSquare = opponentMove.from
    let targetSquare = opponentMove.to
    onDrop({ sourceSquare, targetSquare })
  }

  const resetGame = () => {
    game.current.clear()
    game.current.reset()
    //also clear chessboard
    setFen('start')
  }

  return (
    <div>
      <button onClick={onDropFromStore}>Run opponentMove</button>
      {game.current && game.current.game_over() ? (
        <div>
          <span>game over</span>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <span>Game</span>
        </div>
      )}
      {game.current && game.current.in_check() ? (
        <div>
          <span>CHECKED</span>
        </div>
      ) : (
        <span></span>
      )}
      {game.current && game.current.in_checkmate() ? (
        <div>
          <span>CHECKMATE</span>
        </div>
      ) : (
        <span></span>
      )}
      {game.current && game.current.in_draw() ? (
        <div>
          <span>DRAW</span>
        </div>
      ) : (
        <span></span>
      )}
      {game.current && game.current.in_stalemate() ? (
        <div>
          <span>STALEMATE</span>
        </div>
      ) : (
        <span></span>
      )}
      <Chessboard
        position={fen}
        onDrop={onDrop}
        onDropFromStore={onDropFromStore}
      />
    </div>
  )
}

export default ChessGame
