const validateMessage = (msg) =>{
    const { message, room  } = msg
    if(!message || !room ){
        return {ok:false, message:'This message does not contain mandatory properties'}
    }
    const indexOfSplitter = message.indexOf('=')
    if(indexOfSplitter === -1){
        return {ok:false, message:'This message was malformed'}
    }
    return {ok:true}
}

const validateCommand = (name, value) =>{
    if (name === ''){
        return {ok:false, message:'The command sent has no name'}
    }
    if (value === ''){
        return {ok:false, message:'The command sent has no value to evaluate'}
    }
    return {ok:true}

}

module.exports = {
    validateMessage, validateCommand
}