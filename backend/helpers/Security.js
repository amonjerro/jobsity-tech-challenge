require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports.socketValidateToken = (socket, next)=>{
    if(!socket.handshake.query || !socket.handshake.query.token){
        socket.emit('auth_error', {ok:false, message:'Authorization has failed'})
        return false;
    }
	jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            socket.emit('auth_error', {ok:false, message:'Authorization has failed'})
        } else{
            socket.userName = decoded.x
            next()
        }
    })
}