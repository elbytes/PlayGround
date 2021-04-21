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

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.emit('connection', null)
  console.log('new user connected')
  console.log(socket.id)
})

const allowedOrigins = ['http://localhost:3000']
const options = (cors.CorsOptions = {
  origin: allowedOrigins,
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
httpServer.listen(PORT, () => console.log(`Server is running on ${PORT}`))
