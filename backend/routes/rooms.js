const express = require('express')
const routes = express()

const {index, create } = require('../controllers/RoomController')

routes.get('/ls', (req,res)=>{
    index(req,res)
})

routes.post('/create', (req,res)=>{
    create(req,res)
})

module.exports = routes