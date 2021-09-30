import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())
const httpServer = createServer(app)

const allowedOrigins = ['*']
const options = (cors.CorsOptions = {
  origin: '*',
  method: ['GET', 'POST'],
})

app.use(cors(options))
app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/users', userRoutes)
//app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: false,
  },
})

let peers = []
const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
}

io.on('connection', (socket) => {
  socket.emit('connection', null)
  console.log('New user connected')
  console.log(socket.id)

  //when a user sets nickname for videocall
  socket.on('register-new-user', (data) => {
    peers.push({
      username: data.username,
      socketId: socket.id,
    })
    console.log('registered new user')
    console.log(peers)

    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnect')
    peers = peers.filter((peer) => peer.socketId !== socket.id)
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    })
  })

  //listeners for direct call
  socket.on('pre-offer', (data) => {
    console.log('pre-offer handled')
    console.log(data)
    io.to(data.callee.socketId).emit('pre-offer', {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    })
  })

  socket.on('pre-offer-answer', (data) => {
    console.log('handling pre offer answer')
    io.to(data.callerSocketId).emit('pre-offer-answer', {
      answer: data.answer,
    })
  })

  socket.on('webRTC-offer', (data) => {
    console.log('handling webRTC offer in server')
    io.to(data.calleeSocketId).emit('webRTC-offer', {
      offer: data.offer,
    })
  })

  socket.on('webRTC-answer', (data) => {
    console.log('handling webRTC answer')
    io.to(data.callerSocketId).emit('webRTC-answer', {
      answer: data.answer,
    })
  })

  socket.on('webRTC-candidate', (data) => {
    console.log('handling ice candidate')
    io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
      candidate: data.candidate,
    })
  })

  socket.on('user-hanged-up', (data) => {
    console.log('handling user-hanged-up')
    io.to(data.connectedUserSocketId).emit('user-hanged-up')
  })

  socket.on('typing', (data) => {
    console.log('received user-typing on server', data)
    io.to(data.socket).emit('typing', data.typing)
  })

  //listener for activity selected
  socket.on('activity', (data) => {
    console.log('received activity choice on server', data)
    io.to(data.socket).emit('activity', data)
    console.log('sending selected activity to second client', data)
  })

  //listeners for canvas
  socket.on('draw', (data) => {
    console.log('handling draw on server')
    console.log('loging draw data from server: ', data)
    //send draw data to other client
    // socket.to(data.connectedUserSocketId).emit('draw', data)
    socket.broadcast.emit('draw', data)
    console.log('connectedUserSocketId', data.connectedUserSocketId)
  })

  socket.on('object-added', (data) => {
    io.to(data.socket).emit('new-add', data.object)
    console.log('receiving add shape event in server', data.object)
  })

  socket.on('object-modified', (data) => {
    io.to(data.socket).emit('new-modification', data.drawData)
    console.log('receiving modify shape event in server')
  })

  socket.on('erase', (data) => {
    console.log('received erase event on server', data)
    io.to(data.socket).emit('erase', data.canvas)
  })

  socket.on('backdrop', (data) => {
    console.log('received backdrop event on server', data)
    io.to(data.socket).emit('backdrop', data.backdrop)
  })

  //listeners for chess
  socket.on('move', (data) => {
    io.to(data.socket).emit('move', data.move)
    console.log('the data received from chess clinet', data.move)
  })

  socket.on('game-state', (data) => {
    io.to(data.socket).emit('game-state', data.gameState)
    console.log('game state data received from chess client', data)
  })

  socket.on('turn', (data) => {
    io.to(data.socket).emit('turn', data.turn)
    console.log('received turn on server', data.turn)
  })

  //listeners for book
  socket.on('book-select', (data) => {
    console.log('received book select data on server', data)
    io.to(data.socket).emit('book-select', data.bookSelected)
  })

  socket.on('book-next', (data) => {
    console.log('received book next data on server', data)
    io.to(data.socket).emit('book-next', data.next)
  })

  socket.on('book-prev', (data) => {
    console.log('received book prev data on server', data)
    io.to(data.socket).emit('book-prev', data.prev)
  })
})

httpServer.listen(PORT)
