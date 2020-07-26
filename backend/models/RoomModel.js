const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
	uuid:{
        type:String,
        required:true
    },
    roomName:{
        type:String,
        required:true,
        trim:true
    }
},
{timestamps:true})

const Room = mongoose.model('rooms',roomSchema);

module.exports = {
    Room
}