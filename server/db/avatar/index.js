import mongoose from 'mongoose'


export const def = {
	uri : '/files/def/user-m.png',
	width: 512,
	height: 512,
	active: true,
	host: true,
	isDefault: true
}


const schema = new mongoose.Schema({
	uri : {
		type: String,
		default: def.uri
	},
	width: {
		type: Number,
		default: def.width
	},
	height: {
		type: Number,
		default: def.height
	},
	host: {
		type: Boolean,
		default: def.host
	},
	active: Boolean
})


export default schema