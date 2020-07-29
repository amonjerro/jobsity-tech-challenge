const jwt = require('jsonwebtoken');

const socketValidateToken = (socket, next)=>{
    if(!socket.handshake.query || !socket.handshake.query.token){
        socket.emit('auth_error', {ok:false, message:'Authorization has failed'})
        return false;
    }
	jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){
            socket.emit('auth_error', {ok:false, message:'Authorization has failed'})
            return false
        } else{
            socket.userName = decoded.x
            next()
        }
    })
}

module.exports = {
    socketValidateToken
}