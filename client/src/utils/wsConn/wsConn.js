import { io } from 'socket.io-client'

const SERVER = 'http://localhost:5000'

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
}
