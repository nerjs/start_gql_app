import mongoose from 'mongoose'

import avatarSchema from '../avatar'

const {
	VALIDATE_LOGIN_MIN,
	VALIDATE_LOGIN_MAX
} = process.env


const { ObjectId } = mongoose.Types


export default new mongoose.Schema({
	login : {
		type : String,
		unique : true,
		required : true,
		minlength : VALIDATE_LOGIN_MIN,
		maxlength : VALIDATE_LOGIN_MAX,
		match : /^[a-zA-Z0-9_-]+$/
	},
	hashPassword : {
		type : String,
		required : true
	},
	salt : String,
	email : {
		type: String,
		set: v => v && v.toLowerCase ? v.toLowerCase() : ''
	},
	sex: {
		type: Number,
		default: 0,
		set: v => {
			const s = Number(v);
			if (s < -1) return -1;
			if (s > 1) return 1;
			return 0;
		}
	},
	displayName : String,
	allAvatars: [avatarSchema]
},{
	timestamps: true
})

