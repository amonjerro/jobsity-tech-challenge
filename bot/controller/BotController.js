const AMQP = require('../config/amqp')
const { validateCommand, validateMessage} = require('../helpers/validator')
const { stockQuery } = require('./StockQuerier.js')

const commandLibrary = {
    'stock': stockQuery
}

const parseCommand = (msgContents) =>{
    const { message } = msgContents
    let indexOfSplitter = message.indexOf('=')
    let commandName = message.substr(1, indexOfSplitter-1)
    let commandValue = message.substr(indexOfSplitter+1)
    return { commandName, commandValue}
}

const handleCommand = (msg, msgContents) => {
    const { commandName, commandValue } = parseCommand(msgContents)
    //Guard Clauses
    let v = validateCommand(commandName, commandValue)
    if(!v.ok){
        AMQP.reply(msg, v)
        return false
    }
    if (!commandLibrary[commandName]){
        AMQP.reply(msg, {ok:false, message:'This command does not exist'})
        return false
    }

    commandLibrary[commandName](msg, commandValue)
}

const command = (msg, msgContents) =>{
    //Validate if request is valid
    let v = validateMessage(msgContents)
    if(!v.ok){
        AMQP.reply(msg, v)
        return false
    }
    handleCommand(msg, msgContents)
}


module.exports = {
    command
}