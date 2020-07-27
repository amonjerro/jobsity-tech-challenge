const { send } = require('../controllers/MessageController')

const socketManager = (socket, io) =>{
    socket.on('join', (params)=>{
        const { room } = params
        socket.join(room)
        io.to(room).emit('join_success', {ok:true})
    })
    socket.on('send', (params)=>{
        const { message, userName, room } = params
        send({message, userName, room}, socket)
    })
    socket.on('disconnect', () =>{
        console.log('Socket Disconnected', socket.id)
    })
}


module.exports = { socketManager }