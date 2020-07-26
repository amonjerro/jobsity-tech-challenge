const {uuid} = require('uuidv4')
const { Room } = require('../models/RoomModel')
const { validateRoomCreateFields } = require('../validators/RoomValidator')

const index = async (req,res) =>{
    let rooms = await Room.find({})
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
        roomId:uuid(),
        roomName:req.body.roomName
    }
    let room = new Room(payload)
    let createdRoom = await room.save()
    if(!createdRoom._id){
        res.json({ok:false, message:'There was a problem creating this chat room'})
        return false
    }

    //Update the rooms for everybody
}

module.exports = {
    index, create
}