require('dotenv').config()

//Express Server Basics
const express = require('express')
const app = express()

const{ command } = require('./controller/BotController') 

//AMQP
const AMQP = require('./config/amqp')
AMQP.startConnection(command)


app.listen(process.env.PORT || 4000, ()=>{
    console.log('Bot Online')
})