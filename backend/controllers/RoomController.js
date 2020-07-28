const {uuid} = require('uuidv4')
const { Room } = require('../models/RoomModel')
const SocketServer = require('../config/sockets')
const { validateRoomCreateFields } = require('../validators/RoomValidator')

const index = async (req,res) =>{
    let rooms = await Room.find({},'-_id -createdAt -updatedAt')
    if (rooms.length < 1){
        res.json({ok:false, message:"We couldn't find any open rooms" })
        return false
    }
    res.json({ok:true, data:rooms})
}

const create = async (req, res) =>{
    let v = validateRoomCreateFields(req)
    if (!v.ok){
        res.json(v)
        return false
    }
    let payload = {
        uuid:uuid(),
        roomName:req.body.roomName
    }
    let room = new Room(payload)
    let createdRoom = await room.save()
    if(!createdRoom._id){
        res.json({ok:false, message:'There was a problem creating this chat room'})
        return false
    }

    res.json({ok:true})
    //Update the rooms for everybody
    const io = SocketServer.getConnection()
    io.emit('new_room',payload)
}

module.exports = {
    index, create
}