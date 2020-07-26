const express = require('express')
const routes = express()

const { find } = require('../controllers/MessageController')

routes.get('/ls/:room', (req,res)=>{
    find(req,res)
})


module.exports = routes