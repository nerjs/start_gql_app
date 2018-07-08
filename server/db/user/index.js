import mongoose from 'mongoose'

import schema from './schema'
import UserClassDb from './class'


const userSchema = mongoose.Schema(schema)






userSchema.virtual('password')
	.set(function(password) {
		this.setHashAuthPass(password)
	})
	.get(function(){
		return this._plainPassword
	})



userSchema.loadClass(UserClassDb);

export default mongoose.model('User',userSchema)