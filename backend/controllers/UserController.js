const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS,10);

const jwt = require('jsonwebtoken')
const { User } = require('../models/UserModel')
const { validateLoginFields, validateRegisterFields, validatePassword } = require('../validators/UserValidator')

const login = async (req, res) =>{
    //Validate to see if the information is OK
    const { ok, message } = validateLoginFields(req)
    if(!ok){
        res.json({ok, message})
        return false
    }

    //Deconstruct information from request body
    const { userInfo, password } = req.body

    //Find the user
    let user = await User.findOne({$or:[{email:userInfo}, {userName:userInfo}]})
    if (!user){
        res.json({ok:false, message:"We couldn't find a user with the credential you provided us"})
        return false
    }

    //Password checks out?
    const passwordMatch = await bcrypt.compare(password, user.password) 
    if(!match){
        res.json({ok:false, message:"This username and password don't match"})
        return false
    }

    //Create a token
    let token = jwt.sign({x:userName}, process.env.JWT_TOKEN, {expiresIn:'30d'})
    res.json({ok:true, authToken:token, userName:user.userName})
    
}

const register = async (req, res) =>{
    //Validate to see if the information is Ok
    let v = validateRegisterFields(req)
    if(!v.ok){
        res.json({ok:v.ok, message:v.message})
        return false
    }
    //Deconstruct information from request body
    const { userName, firstName, lastName, password, email } = req.body

    //Does the username or the email exist in BD?
    let previousUsers = await User.find({$or:[{email, userName}]})
    if (previousUsers.length > 0){
        res.json({ok:false, message:'It seems this username or this email are already in use. Please select another one.'})
        return false
    }

    //Password Processing
    v = validatePassword(password)
    if(!v.ok){
        res.json({ok:v.ok, message: v.message})
        return false
    }
    let hash = bcrypt.hashSync(password, saltRounds)

    //Create the user
    const payload = { userName, firstName, lastName, email, password:hash }
    let user = new User(payload)
    await user.save()

    //If registration is succesful, might as well log the user in and speed that whole process up
    let token = jwt.sign({x:userName}, process.env.JWT_SECRET, {expiresIn:'30d'})
    res.json({ok:true, token:token, userName})

}

module.exports = {
    login, register
}