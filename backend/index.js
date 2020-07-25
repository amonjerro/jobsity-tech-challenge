require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const routes = require('./routes/index')

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,resp,next)=>{
	resp.set("Access-Control-Allow-Origin","*")
	resp.set('Access-Control-Allow-Methods','GET,POST')
	resp.set('Access-Control-Allow-Headers','Origin, X-Requested-With,Accept,Authorization,Content-Type,charset,x-access-token')
	next();
})

app.use('/',routes)

app.listen(process.env.PORT || 4100, ()=>{
    console.log('Backend Online')
})