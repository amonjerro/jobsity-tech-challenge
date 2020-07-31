console.log('Starting Backend Set Up Process')

const fs = require('fs')
const crypto = require('crypto')
const localPath = './backend'

const writeEnv = () =>{
    let contents = ''
    //Establish BOT_QUEUE_NAME
    contents += 'BOT_QUEUE_NAME=bot_queue\n'
    //Establish PORT
    contents += 'PORT=4100\n'
    //Establish SALT_ROUNDS
    contents += 'SALT_ROUNDS=15\n'
    //Establish APP_ID and JWT Secret
    let a = crypto.randomBytes(32).toString('hex')
    let b = crypto.randomBytes(32).toString('hex')
    contents += 'APP_ID='+a+'\n'
    contents += 'JWT_SECRET='+b+'\n'
    //ESTABLISH LOCALHOST FOR MONGO AND AMQP
    contents += 'MONGO_URI=mongodb://mongoService/\n'
    contents += 'AMQP_CONNECTION=amqp://amqpService'

    fs.writeFileSync(localPath+'/.env', contents)
}

const validateEnv = (f) =>{
    let contents = fs.readFileSync(localPath+'/.env', {encoding:'utf-8'}).split('\n')

    let expectedKeys = ['BOT_QUEUE_NAME','PORT','SALT_ROUNDS','APP_ID','JWT_SECRET','MONGO_URI','AMQP_CONNECTION']
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
            case 'BOT_QUEUE_NAME':
                if (environmentValues[i] !== 'bot_queue'){
                    console.error('ERROR - BOT_QUEUE must be bot_queue')
                    isValidEnv = false
                }
            break;
            case 'SALT_ROUNDS':
                let rounds = parseInt(environmentValues[i],10)
                if (isNaN(rounds)){
                    console.error('ERROR - SALT_ROUNDS not a number.')
                    isValidEnv = false
                }
                if (rounds < 15){
                    console.error('ERROR - SALT_ROUNDS does not meet security standards. Must be greater than or equal to 15.')
                    isValidEnv = false
                }
            break;
            case 'APP_ID':
                if (environmentValues[i].length < 64){
                    console.error('ERROR - APP_ID does not meet security standards in length')
                    isValidEnv = false
                }
                if (!environmentValues[i].match(/[0-9a-f]/)){
                    console.error('ERROR - APP_ID does not meet security standards of being a hexadecimal')
                    isValidEnv = false
                }
            break;
            case 'JWT_SECRET':
                if (environmentValues[i].length < 64){
                    console.error('ERROR - JWT_SECRET does not meet standards in length')
                    isValidEnv = false
                }
                if (!environmentValues[i].match(/[0-9a-f]/)){
                    console.error('ERROR - APP_ID does not meet security standards of being a hexadecimal')
                    isValidEnv = false
                }
            break;
        }
        
    }
    if (isValidEnv){
        console.log('Env File is in adequate status')
    }
    console.log('Please make sure your MONGO_URI and AMQP_CONNECTION are properly configured.')
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