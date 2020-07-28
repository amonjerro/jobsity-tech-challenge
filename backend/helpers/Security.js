require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports.expressTokenCheck = (req,res,next)=>{
	if (req.headers.authorization === undefined){
		return res.json({ok:false,message:'Unauthorized access. Error Code 100-A.'})
	}
	let token = req.headers.authorization
	jwt.verify(token,process.env.JWT_SECRET, async (err,decode)=>{
		if (err){
			return res.json({ok:false,message:'Error in access verification',code:420})
		}
		let user =  await User.getOne(decode.x)
		if (!user.active){
			return res.json({ok:false, message:'Unauthorized access. Error Code 300-A'})
		} else{
			req.user = decode.x
			req.level = decode.y
			next()
		}
	})
}

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