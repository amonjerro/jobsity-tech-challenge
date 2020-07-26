
const validateLoginFields = (req) =>{
    const { password, userInput } = req.body

    //Required Fields
    if (!password || !userInput){
        return {ok:false, message:'The password fields and an identifier for the user must be provided'}
    }
    return {ok:true, message:''}
}

const validateRegisterFields = (req) =>{
    
    const { firstName, lastName, userName, password, email } = req.body

    //Required Fields
    if(!firstName || !lastName || !userName || !email || !password){
        return {ok:false, message:'Please fill out the information with regards to your first name, your last name, your email, a username and a password'}
    }
    return validateEmailFormat(email)
 
}

const validateEmailFormat = (email) =>{
    //Valid formats inclue 129314@somedomain.org, abc123_mcQueen@otherdomain.com
    if (!/^[A-z0-9._]+@\w+\.\w+$/.test(email)){
		return {ok:false, message:'Email format is invalid'};
    }
    return {ok:true, message:''}
}

const validatePassword = (password) =>{
    let upperCase = /[A-Z]/
	let lowerCase = /[a-z]/
	let numeric = /\d/
	let specialCharacters = /[^A-z0-9]/
	if (!password.length > 8 || !upperCase.test(password) || !lowerCase.test(password) || !numeric.test(password) || !specialCharacters.test(password)){		
		return {ok:false, message:'This password does not comply with having a lower case letter, an upper case letter, a number and a special character or has less than 8 characters total.'}
    }
    return {ok:true, message:''}
}

module.exports = {
    validateLoginFields, validateRegisterFields, validatePassword
}