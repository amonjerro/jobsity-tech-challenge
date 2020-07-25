const express = require('express')
const routes = express()

routes.use('/user', users)

module.exports = routes