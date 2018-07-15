import mongoose from 'mongoose'


import userSchema from './schema'
import UserClassDb from './class'
import { validatePassword } from './validate'

const { ValidationError, ValidatorError } = mongoose.Error

const {
	VALIDATE_PASSWORD_MIN,
	VALIDATE_PASSWORD_MAX
} = process.env




userSchema.virtual('password')
	.set(function(password) {
		this.setHashAuthPass(password)
	})
	.get(function(){
		return this._plainPassword
	})

userSchema.pre('validate', function(next) {
	if (!this.isNew) return next()
	const password = this._plainPassword || '';
	const res = validatePassword(password)
	if (res.length) return next(this.invalidate('password','Password is invalid', password, 'minlength'))
	if (res.regexp) return next(this.invalidate('password','Password is invalid', password, 'regexp'))
	next()
})

userSchema.loadClass(UserClassDb);

export default mongoose.model('User',userSchema)