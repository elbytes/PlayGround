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

let peers = ['']
io.on('connection', (socket) => {
  socket.emit('connection', null)
  console.log('New user connected')
  console.log(socket.id)

  socket.on('register-new-user', (data) => {
    peers.push({
      username: data.username,
      socket: data.socketId,
    })
    console.log('registered new user')
    console.log(peers)
  })
})
httpServer.listen(PORT)
