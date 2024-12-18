const express = require('express')
const app = express()
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('./config/morgan')
const socket = require('./socket')
const messageRoutes = require('./routes/messages')
const channelRoutes = require('./routes/channels')
const authMiddleware = require('./middleware/auth');

app.use(express.json())
app.use(helmet())
app.use(compression())
app.use(morgan)

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next();
})

app.use(messageRoutes)
app.use(channelRoutes)
// app.use(authMiddleware)

app.use((error, req, res, next) => {
  const {
    statusCode,
    message,
    errorArray
  } = error

  res.status(statusCode).json({ message: message, errors: errorArray })
})

const server = app.listen(5004)
socket.init(server)
