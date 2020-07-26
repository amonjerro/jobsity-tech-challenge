const express = require('express')
const routes = express()
const users = require('./users')


routes.use('/user', users)

module.exports = routes