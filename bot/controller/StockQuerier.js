const { get } = require('../helpers/traeWrapper')
const AMQP = require('../config/amqp')

const stockQuery = async (msg, commandValue) =>{
    //Received messages have already been validated

    //Request data from API
    const queryParameters = {
        h:'',f:'sd2t2ohlcv',
        s:commandValue
    }
    const response = await get(process.env.API_URL, queryParameters)

    let replyMessage = processContent(response.data)
    AMQP.reply(msg, replyMessage)
}

const processContent = (text_data) =>{

    //Split the data and the headers
    let lines = text_data.split('\r\n')
    let headers = lines[0].split(',')
    let content = lines[1].split(',')

    //Get symbol
    let indexOfSymbol = headers.indexOf('Symbol')
    let symbolContent = content[indexOfSymbol]

    //Validate Correct Response from Endpoint
    let errorIndex = content.indexOf('N/D')
    if (errorIndex > -1){
        return {ok:false, message:`We could not find a quote for stock code ${symbolContent}`}
    }

    //Check to see if there is a current price header on Monday, for now let's use the CLOSE value
    let indexOfInterest = headers.indexOf('Close')
    let contentOfInterest = content[indexOfInterest]
    
    return {ok:true, message:`${symbolContent} quote is $${contentOfInterest} per share`}
}

module.exports = {
    stockQuery
}