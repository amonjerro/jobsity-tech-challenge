const express = require('express')
const routes = express()

const { login, register } = require('../controllers/UserController')

routes.post('/login', (req, res)=>{
    login(req,res)
})

routes.post('/register', (req, res) =>{
    register(req,res)
})

module.exports = routes