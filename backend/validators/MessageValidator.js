const validateMessageRequest = (req) =>{
    const { room } = req.params
    if (!room){
        return {ok:false, message:'This room does not exist; messages cannot be obtained.'}
    }
    return {ok:true, message:''}
}


module.exports = {
    validateMessageRequest
}
