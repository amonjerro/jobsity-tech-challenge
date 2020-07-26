const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
	text: {
		type:String,
		required:true,
		trim:true
    },
    room: {
        type:String,
        required:true,
        trim:true
    },
    userName: {
        type:String,
        required:true,
        trim:true
    }
},
{timestamps:true})

const Message = mongoose.model('messages',messageSchema);

module.exports = {
    Message
}