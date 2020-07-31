console.log('Starting Front Set Up Process')

const fs = require('fs')
const localPath = './front'

const writeEnv = () =>{
    let contents = ''
    //Establish REACT_APP_BACKEND_URL
    contents += 'REACT_APP_BACKEND_URL=http://localhost:4100\n'
    //Establish PORT
    contents += 'REACT_APP_CHAT_ROOM_MAX=50\n'
    fs.writeFileSync(localPath+'/.env', contents)
}

const validateEnv = (f) =>{
    let contents = fs.readFileSync(localPath+'/.env', {encoding:'utf-8'}).split('\n')

    let expectedKeys = ['REACT_APP_BACKEND_URL','REACT_APP_CHAT_ROOM_MAX']
    let environmentKeys = []
    let environmentValues = []
    try{
        for (let i = 0; i < contents.length; i++){
            let line = contents[i]
            let components=line.split('=')
            let key = components[0].trim()
            if (key.substr(0,9) !== 'REACT_APP'){
                throw 'Malformation'
            }
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
            case 'REACT_APP_CHAT_ROOM_MAX':
                let max_messages = parseInt(environmentValues[i],10)
                if (isNaN(max_messages)){
                    console.error('ERROR - REACT_APP_CHAT_ROOM_MAX not a number.')
                    isValidEnv = false
                }
            break;
        }
        
    }
    if (isValidEnv){
        console.log('Env File is in adequate status')
    }
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