export default {
	login : {
		type : String,
		unique : true,
		required : true
	},
	hashPassword : {
		type : String,
		required : true
	},
	salt : String,
	email : String,
	displayName : String
}

