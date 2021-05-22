import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Chess from 'chess.js'
import Chessboard from 'chessboardjsx'
import { sendMove } from '../../utils/wsConn/wsConn'

function ChessGame() {
  const [fen, setFen] = useState('start')
  const opponentMove = useSelector((state) => state.chess.opponentMove)

  let game = useRef(null)

  useEffect(() => {
    game.current = new Chess()
  }, [])

  const onDrop = ({ sourceSquare, targetSquare }) => {
    let move = game.current.move({ from: sourceSquare, to: targetSquare })
    //check legal moves
    //move function returns null for illegal moves
    if (move === null) return
    //fen string
    setFen(game.current.fen())
    sendMove(move)
  }

  const onDropFromStore = () => {
    console.log('opponentMove from ChessGame', opponentMove.to)
    onDrop(opponentMove.from, opponentMove.to)
  }

  const resetGame = () => {
    game.current.clear()
    game.current.reset()
    //also clear chessboard
    setFen('start')
  }

  return (
    <div>
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
