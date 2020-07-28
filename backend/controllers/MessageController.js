const { Message } = require('../models/MessageModel')
const SocketServer = require('../config/sockets')
const AMQP = require('../config/amqp')
const { validateMessageRequest } = require('../validators/MessageValidator')


const find = async (req,res) =>{
    let v = validateMessageRequest(req)
    if (!v.ok){
        res.json(v)
        return false
    }
    let messages = await Message.find({room:req.params.room}, null, {sort:{createdAt:-1}, limit:50})
    messages.reverse()
    res.json({ok:true, data:messages})
}

const send = async (params) =>{
    
    //Detect wether this message was a bot command
    if(detectBotCommand(params)){
        //Go process that command
        return false
    }

    const { message, room, userName } = params

    //Save Messages
    const m = new Message({
        text:message,
        room:room,
        userName:userName
    })
    let saved_message = await m.save()

    //Otherwise send the message back to everybody in the room
    const io = SocketServer.getConnection()
    io.to(room).emit('message', {text:message, userName, createdAt:saved_message.createdAt, id:saved_message._id})
}

const detectBotCommand = (params) => {
    const { message, room } = params

    //Bot commands start with /
    if (message.substr(0,1) !=='/' ){
        return false
    }

    let botParams = {
        message, room, serviceInstance:process.env.APP_ID
    }

    AMQP.publish(process.env.BOT_QUEUE_NAME, JSON.stringify(botParams))
    return true

}

module.exports = {
    find, send, detectBotCommand
}