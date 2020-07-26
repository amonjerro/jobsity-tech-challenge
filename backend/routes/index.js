const express = require('express')
const routes = express()
const users = require('./users')
const chats = require('./chats')

routes.use('/user', users)
routes.use('/chat', chats)

module.exports = routes