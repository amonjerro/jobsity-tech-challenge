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
    messages.reverse()
    res.json({ok:true, data:messages})
}

const send = async (params) =>{
    
    const { message, room, userName } = params

    //Probably detect wether this is a bot command
    if(detectBotCommand(message)){
        //Go process that command
        return false
    }

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

const detectBotCommand = (message) => {
    return false
}

module.exports = {
    find, send, detectBotCommand
}