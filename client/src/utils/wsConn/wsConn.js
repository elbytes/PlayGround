import socketClient from 'socket.io-client'
import * as webRTCHandler from '../webRTC/webRTCHandler'
import store from '../../store'
import * as dashboardActions from '../../actions/dashboardActions'

const SERVER = 'http://localhost:5000'

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
}
let socket

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER)

  socket.on('connection', () => {
    console.log('Successfully connected wit web socket server ')
    console.log(socket.id)
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

  socket.on('user-hanged-up', (data) => {
    webRTCHandler.handleUserHangedUp(data)
    console.log('handling user-hanged-up in wss')
  })
}

//registering a user after log in in array of active users
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
