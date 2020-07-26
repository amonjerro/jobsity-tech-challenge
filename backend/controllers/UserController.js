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
    const { userName, email, password } = req.body

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
    let previousUsers = await User.find({$or:[email, userName]})
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
    let hash = await  bcrypt.hash(password, saltRounds)

    //Create the user
    const payload = {
        userName, firstName, lastName, email,
        active:true, password:hash
    }
    let user = new User(payload)
    await user.save()

    //If registration is succesful, might as well log the user in and speed that whole process up
    let token = jwt.sign({x:userName}, process.env.JWT_TOKEN, {expiresIn:'30d'})
    res.json({ok:true, authToken:token, userName})

}

module.exports = {
    login, register
}