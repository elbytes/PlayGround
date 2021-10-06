import socketClient from 'socket.io-client'
import { fabric } from 'fabric'
import * as webRTCHandler from '../webRTC/webRTCHandler'
import store from '../../store'
import * as dashboardActions from '../../actions/dashboardActions'
import * as canvasActions from '../../actions/canvasActions'

// const SERVER = 'http://playgroundonline.netlify.app/'
// const SERVER = 'https://playgroundonline.herokuapp.com/'
const SERVER = 'http://localhost:5000'

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
}
let socket
let mySocketId

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER)

  socket.on('connection', () => {
    console.log('Successfully connected with web socket server ')
    console.log('mySocket:', socket.id)
    mySocketId = socket.id
  })

  socket.on('broadcast', (data) => {
    handleBroadcastEvents(data)
  })

  //listeners for direct call
  socket.on('pre-offer', (data) => {
    webRTCHandler.handlePreOffer(data)
    console.log('handling pre-offer in wss')
  })

  socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data)
    console.log('handling pre-offer-answer in wss')
  })

  socket.on('webRTC-offer', (data) => {
    webRTCHandler.handleOffer(data)
    console.log('handling webRTC-offer in wss')
  })

  socket.on('webRTC-answer', (data) => {
    webRTCHandler.handleAnswer(data)
    console.log('handling webRTC-answer in wss')
  })

  socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data)
    console.log('handling webRTC-candidate in wss')
  })

  socket.on('user-hanged-up', (data) => {
    webRTCHandler.handleUserHangedUp(data)
    console.log('handling user-hanged-up in wss')
  })

  //listener for activity selected
  socket.on('activity', (data) => {
    console.log('received activity selected from server', data)
    webRTCHandler.handleActivitySelected(data)
  })

  //listeners for chess
  socket.on('move', (data) => {
    console.log('received data back from server', data)
    webRTCHandler.sendReceivedChessMoveToBoard(data) //to store
  })

  socket.on('game-state', (data) => {
    console.log('received data back from server', data)
    webRTCHandler.handleGameStateChange(data)
  })

  //listerner for canvas drawing
  socket.on('draw', (data) => {
    console.log('receiving draw data back from server', data)
    webRTCHandler.handleReceivedDrawData(data)
  })

  //listener for adding a new shape to canvas
  // socket.on('new-add', (data) => {
  //   //TODO
  // })

  //listener for setting a new backdrop
  socket.on('backdrop', (data) => {
    console.log('received backdrop data back from server', data)
    webRTCHandler.handleBackDrop(data)
  })

  //listener for selecting a book
  socket.on('book-select', (data) => {
    console.log('received book select data back from server', data)
    webRTCHandler.handleBookSelect(data)
  })

  socket.on('book-next', (data) => {
    console.log('received book next data back from server', data)
    webRTCHandler.handleBookNextClicked(data)
  })
}

//registering a user after login in array of active users
export const registerNewUser = (username) => {
  socket.emit('register-new-user', {
    username: username,
    socketId: socket.id,
  })
}

//emmitting events to server for direct call
export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data)
  console.log('emmitting pre-offer')
}

export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data)
  console.log('emmitting pre-offer-answer')
}

export const sendWebRTCOffer = (data) => {
  socket.emit('webRTC-offer', data)
  console.log('emmitting webRTC-offer')
}

export const sendWebRTCAnswer = (data) => {
  socket.emit('webRTC-answer', data)
  console.log('emmitting webRTC-answer')
}

export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data)
  console.log('emmitting webRTC-candidate')
}

export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data)
  console.log('emmitting user-hanged-up')
}

export const emitTyping = (data) => {
  socket.emit('typing', data)
  console.log('emitting typing data', data)
}

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      )
      store.dispatch(dashboardActions.setActiveUsers(activeUsers))
      break
    default:
      break
  }
}

//emit event for activity selected
export const sendActivity = (data) => {
  socket.emit('activity', data)
  console.log('emitting activity event to server')
}

//emitting events to server for chessboard
export const sendMove = (move) => {
  socket.emit('move', move)
  console.log('emitting move event', move)
}

export const sendGameState = (gameState) => {
  socket.emit('game-state', gameState)
  console.log('emitting game state change')
}

export const sendDraw = (drawData) => {
  socket.emit('draw', drawData)
  console.log('emitting draw event to server with drawData payload')
  console.log(drawData)
}

//shape add event for canvas
export const handleBackDrop = (data) => {
  store.dispatch(canvasActions.setBackDrop(data))
  console.log('dispatching backDrop to store')
}

export const emitAdd = (obj) => {
  console.log('emitting add shape event to server')
  socket.emit('object-added', obj)
}
//shape modify event for canvas
export const emitModify = (obj) => {
  socket.emit('object-modified', obj)
}

//adding object on listener for add new shape
export const addObj = (canvas) => {
  socket.on('new-add', (data) => {
    console.log('receiving an add object event', data)
    const { obj, id } = data
    let object
    console.log(obj)
    if (obj.type === 'rect') {
      object = new fabric.Rect({
        height: obj.height,
        width: obj.width,
        color: obj.fill,
      })
    } else if (obj.type === 'circle') {
      object = new fabric.Circle({
        radius: obj.radius,
      })
    } else if (obj.type === 'triangle') {
      object = new fabric.Triangle({
        width: obj.width,
        height: obj.height,
      })
    }

    object.set({ id: id })
    canvas.add(object)
    canvas.renderAll()
  })
}

//modifying object on listener for add new shape
export const modifyObj = (canvas) => {
  socket.on('new-modification', (data) => {
    const { obj, id } = data
    canvas.getObjects().forEach((object) => {
      if (object.id === id) {
        object.set(obj)
        object.setCoords()
        canvas.renderAll()
      }
    })
  })
}

//erasing canvas board on listener for erase
export const eraseBoard = (canvas) => {
  console.log('erase board running before on')
  socket.on('erase', () => {
    console.log('erase board running after on')
    canvas.clear()
  })
}

export const emitSetBackDrop = (data) => {
  socket.emit('backdrop', data)
  console.log('sending backdrop set to server')
}

//book emit events
export const emitBookSelection = (data) => {
  socket.emit('book-select', data)
  console.log('sending book selected to server')
}

export const emitNextClicked = (data) => {
  socket.emit('book-next', data)
  console.log('sending next click to server')
}

export const emitPrevClicked = (data) => {
  socket.emit('book-prev', data)
  console.log('sending prev click to server')
}
export { mySocketId }
