import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import activityRoutes from './routes/activityRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {  errorHandler } from './middlewares/errorMiddleware.js'
import * as Video from 'twilio-video'

dotenv.config()

connectDB()

const app = express()


app.use(express.json())
 
const allowedOrigins = ['http://localhost:3000']
const options = cors.CorsOptions = {
  origin: allowedOrigins
}

app.use(cors(options))



app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/activity', activityRoutes)
app.use('/api/users', userRoutes)

//app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`))
