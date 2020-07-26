const express = require('express')
const routes = express()

const rooms = require('./rooms')
const messages = require('./messages')

routes.use('/room', rooms)
routes.use('/message', messages)


module.exports = routes