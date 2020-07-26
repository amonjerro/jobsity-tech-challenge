const { Message } = require('../models/MessageModel')
const { validateMessageRequest } = require('../validators/MessageValidator')

const find = async (req,res) =>{
    let v = validateMessageRequest(req)
    if (!v.ok){
        res.json(v)
        return false
    }
    let messages = await Message.find({room:req.params.room}, null, {sort:{created_at:-1}, limit:50})
    res.json({ok:true, data:messages})
}

const send = async (req, res) =>{

}

const detectBotCommand = async (req, res) =>{

}

module.exports = {
    find, send, detectBotCommand
}