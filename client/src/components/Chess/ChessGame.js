import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
import Chess from 'chess.js'
import Chessboard from 'chessboardjsx'
import { sendMove, sendGameState } from '../../utils/wsConn/wsConn'
import { connectedUserSocketId } from '../../utils/webRTC/webRTCHandler'
function ChessGame() {
  const [fen, setFen] = useState('start')
  // const [gameState, setGameState] = useState('inProgress')
  const gameState = useSelector((state) => state.chess.gameState)
  let opponentMove = ''
  opponentMove = useSelector((state) => state.chess.opponentMove)

  let game = useRef(null)

  useEffect(() => {
    game.current = new Chess()
  }, [])

  useEffect(() => {
    onDropFromStore(opponentMove)
    // eslint-disable-next-line
  }, [opponentMove])

  let gameStateDataToSend = {
    socket: connectedUserSocketId,
    gameState: gameState,
  }

  if (game.current && game.current.in_check()) {
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_checkmate()) {
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_draw()) {
    sendGameState(gameStateDataToSend)
  }
  if (game.current && game.current.in_stalemate()) {
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
    setFen(game.current.fen())
  }

  const onDropFromStore = (opponentMove) => {
    if (!opponentMove) return
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
      {game.current && game.current.game_over() ? (
        <div>
          <span>game over</span>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <></>
      )}
      {game.current && game.current.in_check() ? (
        <div>
          <Alert variant='danger'>CHECKED</Alert>
        </div>
      ) : (
        <></>
      )}
      {game.current && game.current.in_checkmate() ? (
        <div>
          <Alert variant='danger'>CHECKMATE</Alert>
        </div>
      ) : (
        <></>
      )}
      {game.current && game.current.in_draw() ? (
        <div>
          <Alert variant='danger'>DRAW</Alert>
        </div>
      ) : (
        <></>
      )}
      {game.current && game.current.in_stalemate() ? (
        <div>
          <Alert variant='danger'>STALEMATE</Alert>
        </div>
      ) : (
        <></>
      )}
      <div>
        <h5>
          {game.current && game.current.turn() === 'b' ? (
            <h4>It's Black turn</h4>
          ) : (
            <h4>It's White turn</h4>
          )}
        </h5>
        {}
      </div>
      <Chessboard
        position={fen}
        onDrop={onDrop}
        onDropFromStore={onDropFromStore}
      />
    </div>
  )
}

export default ChessGame
