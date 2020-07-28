//ENV setup
require('dotenv').config()

//Imports and requirements

//Database
const mongoose = require('mongoose')

//Express and HTTP Server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http')

//Sockets
const SocketServer = require('./sockets/config')
const { socketManager } = require('./sockets/index')
const { socketValidateToken } = require('./helpers/Security')


//CORS, JSON body-parsing and other HTTP basic set up actions
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,resp,next)=>{
	resp.set("Access-Control-Allow-Origin","*")
	resp.set('Access-Control-Allow-Methods','GET,POST')
	resp.set('Access-Control-Allow-Headers','Origin, X-Requested-With,Accept,Authorization,Content-Type,charset,x-access-token')
	next();
})

//Navigation
const routes = require('./routes/index')
app.use('/',routes)

//Database connection
mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
}).then(()=>{
	console.log('Mongo connection online')
}).catch((err)=>{
	console.log("Mongo Connection Error:",err)
})
mongoose.set('useCreateIndex',true)

//Startup
const server = http.createServer(app)
const io = SocketServer.startConnection(server)


//Socket Handling
io.use((socket, next)=>{
	socketValidateToken(socket, next)
})
io.on('connection', (socket)=>{
	console.info('Socket Connected', socket.id)
	socketManager(socket, io)
})

server.listen(process.env.PORT || 4100)