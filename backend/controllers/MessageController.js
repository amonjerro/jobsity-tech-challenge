const { Message } = require('../models/MessageModel')
const SocketServer = require('../sockets/config')
const { validateMessageRequest } = require('../validators/MessageValidator')

const find = async (req,res) =>{
    let v = validateMessageRequest(req)
    if (!v.ok){
        res.json(v)
        return false
    }
    let messages = await Message.find({room:req.params.room}, null, {sort:{createdAt:-1}, limit:50})
    res.json({ok:true, data:messages})
}

const send = async (params) =>{
    
    const { message, room, userName } = params

    //Save Messages
    const m = new Message({
        text:message,
        room:room,
        userName:userName
    })
    await m.save()

    //Probably detect wether this is a bot command
    if(detectBotCommand()){
        //Go process that command
        return false
    }

    //Otherwise send the message back to everybody in the room
    const io = SocketServer.getConnection()
    io.to(room).emit('message', {message, userName})
}

const detectBotCommand = async (message) =>{
    return false
}

module.exports = {
    find, send, detectBotCommand
}