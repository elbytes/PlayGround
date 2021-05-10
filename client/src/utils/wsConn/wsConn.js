import { io } from 'socket.io-client'
import * as webRTCHandler from '../webRTC/webRTCHandler'
import store from '../../store'
import * as dashboardActions from '../../actions/dashboardActions'
const SERVER = 'http://localhost:5000'

const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
}
let socket

export const connectWithWebSocket = () => {
  socket = io(SERVER, {
    withCredentials: false,
    extraHeaders: {},
  })
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
  })

  socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data)
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
}

export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data)
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
