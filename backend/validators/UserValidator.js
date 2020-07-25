
const validateLoginFields = (req) =>{
    const { email, password } = req.body

    //Required Fields
    if (!email || !password){
        return false
    }
    return true
}

const validateRegisterFields = (req) =>{
    let isValid = validateLoginFields(req)
    const { firstName, lastName, userName } = req.body

    //Required Fields
    if(!firstName || !lastName || !userName){
        return false
    }
}

module.exports = {
    validateLoginFields, validateRegisterFields
}