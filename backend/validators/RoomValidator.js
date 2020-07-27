const validateRoomCreateFields = (req) =>{
    const { roomName } = req.body
    if (!roomName){
        return {ok:false, message:'This room is missing a name'}
    }
    return {ok:true, message:''}
}

module.exports = {
    validateRoomCreateFields
}