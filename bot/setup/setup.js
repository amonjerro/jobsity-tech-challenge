console.log('Starting Bot Set Up Process')

const localPath = './bot'
const fs = require('fs')


const writeEnv = () =>{
    let contents = ''
    //Establish API_URL
    contents += 'API_URL=https://stooq.com/q/l/\n'
    //Establish PORT
    contents += 'PORT=4000\n'
    //Establish BOT_CONSUMER_QUEUE
    contents += 'BOT_CONSUMER_QUEUE=bot_queue\n'
    //ESTABLISH LOCALHOST FOR AMQP
    contents += 'AMQP_CONNECTION=amqp://amqpService'

    fs.writeFileSync(localPath+'/.env', contents)
}

const validateEnv = (f) =>{
    let contents = fs.readFileSync(localPath+'/.env', {encoding:'utf-8'}).split('\n')

    let expectedKeys = ['BOT_CONSUMER_QUEUE','PORT','AMQP_CONNECTION', 'API_URL']
    let environmentKeys = []
    let environmentValues = []
    try{
        for (let i = 0; i < contents.length; i++){
            let line = contents[i]
            let components=line.split('=')
            let key = components[0].trim()
            let value = components[1].trim()
            environmentKeys.push(key)
            environmentValues.push(value)
        }
    }catch(e){
        console.error('ERROR - Malformed .env file. Delete file and run setup again.')
        process.exit(0)
    }

    let unmetExpectations = expectedKeys.filter((e)=>{return !environmentKeys.includes(e)})
    if(unmetExpectations.length > 0){
        console.error('ERROR - Malformed .env file. Delete file and run setup again.')
        process.exit(0)
    }
    let isValidEnv = true
    for (let i = 0; i < environmentKeys.length; i++){
        switch(environmentKeys[i]){
            case 'BOT_CONSUMER_QUEUE':
                if (environmentValues[i] !== 'bot_queue'){
                    console.error('ERROR - BOT_QUEUE must be bot_queue')
                    isValidEnv = false
                }
            break;
        }
        
    }
    if (isValidEnv){
        console.log('Env File is in adequate status')
    }
    console.log('Please make sure your API_URL and AMQP_CONNECTION are properly configured.')
    console.log('=====DONE=====')
}

const detectEnv = (fileList) =>{
    let env = fileList.filter((f) =>{return f === '.env'})
    if (env.length == 0){
        console.log('No .env file detected, proceeding to create environment')
        writeEnv()
        return false
    }
    let f = env[0]
    console.log('Environment file detected, proceeding to validate it')
    validateEnv(f)
}

fs.readdir(localPath,(err, files)=>{
    detectEnv(files)
})