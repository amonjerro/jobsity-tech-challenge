const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type:String,
		required:true,
		trim:true
	},
	lastName:{ 
		type:String,
		required:true,
		trim:true
	},
	email:{
		type:String,
		required:true,
		lowercase:true,
		trim:true
	},
	password: {
		type:String,
		trim:true,
		min:60
	},
	level:{
		type:String,
		required:true,
		lowercase:true,
		trim:true
	},
	active:'boolean'
},
{timestamps:true})

const User = mongoose.model('users',userSchema);

module.exports = {
    User
}