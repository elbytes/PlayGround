import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import activityRoutes from './routes/activityRoutes.js'
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
app.use('/api/activity', activityRoutes)
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
      socketId: data.socketId,
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
})

httpServer.listen(PORT)
