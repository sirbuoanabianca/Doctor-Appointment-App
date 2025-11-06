import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './config/mongoDB.js'
import { errorHandler } from './middlewares/errorHandler.js'

import userRoutes from './routes/userRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

connectToDB();

// Middleware
app.use(express.json())
app.use(cors())

// static files from uploads directory
app.use('/uploads', express.static('uploads'))

// API Routes
app.use('/api/user', userRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/appointment', appointmentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/payment', paymentRoutes)


// Error handling middleware
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
