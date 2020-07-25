const { get } = require('../helpers/traeWrapper')
const { validateStockRequest } = require('../helpers/validator')


const stockQuery = async (req,res) =>{
    //Validate if request is valid
    if(!validateStockRequest(req)){
        //TODO Handle Failures
        res.json({ok:false})
        return false
    }

    //Request data from API
    const queryParameters = {
        h:'',f:'sd2t2ohlcv',
        s:req.body.stock_code
    }
    const response = await get(process.env.API_URL, queryParameters)

    processContent(response.data, res)
}

const processContent = (text_data, res) =>{

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
        res.json({ok:false, message:`We could not find a quote for stock code ${symbolContent}`})
        return false
    }

    //Check to see if there is a current price header on Monday, for now let's use the CLOSE value
    let indexOfInterest = headers.indexOf('Close')
    let contentOfInterest = content[indexOfInterest]
    
    return res.json({ok:true, message:`${symbolContent} quote is $${contentOfInterest} per share`})
}

module.exports = {
    stockQuery
}