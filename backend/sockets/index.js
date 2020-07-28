const { send } = require('../controllers/MessageController')

const socketManager = (socket) =>{
    socket.on('join', (params)=>{
        const { room } = params
        socket.join(room)
    })
    socket.on('leave', (params)=>{
        const { room } = params
        socket.leave( room )
    })
    socket.on('send', (params)=>{
        const { message, room } = params
        const userName = socket.userName
        send({message, userName, room})
    })
    socket.on('disconnect', () =>{
        console.log('Socket Disconnected', socket.id)
    })
}


module.exports = { socketManager }