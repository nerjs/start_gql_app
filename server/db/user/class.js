import mongoose from 'mongoose'

import { getHash, isHash } from 'hash'
import DefClass from '../db_class'
import { def as defAvatar } from '../avatar'
import { validatePassword } from './validate'
import Logger from 'log'
import ResErr, {
	DB_ERROR,
	UNKNOWN_ERROR,
	TYPES_ERROR,
	LOGIN_BUSY,
	NOT_FOUND,
	BAD_QUERY,
	WRONG_PASSWORD,
	LOGIN_VALIDATE_LENGTH,
	LOGIN_VALIDATE_CHARS,
	PASSWORD_VALIDATE_LENGTH,
	PASSWORD_VALIDATE_CHARS
} from 'errors'

const log = Logger('db:user')

const { ValidationError, ValidatorError } = mongoose.Error 

// log(new ValidatorError())
// log(new ValidationError())

// Validation:
// e.errors
// e.errors.login
// e.errors.login.message
// e.errors.login.kind


const { DB_SALT } = process.env

class UserClassDb extends DefClass {
	
	isAuthByPass(password) {
		return isHash(`${this.salt}-${password}-${DB_SALT}`,this.hashPassword)
	}

	setHashAuthPass(password) {
		this._plainPassword = password
		this.salt = Math.random()
		this.hashPassword = getHash(`${this.salt}-${password}-${DB_SALT}`)
	}


	get avatar() {
		if (!this.allAvatars || !Array.isArray(this.allAvatars)) return null;
		if (this.allAvatars.length == 0) return {...defAvatar};
		var cur;

		this.allAvatars.forEach( av => {
			if (av.active) {
				cur = av;
			}
		})

		return cur || {...defAvatar}
	}

	async setAvatar(id) {
		this.allAvatars = this.allAvatars.map( av => {
			log.debug(av.id == id)
			if (av.id == id) {
				av.active = true
			} else {
				av.active = false
			}
			return av;
		})
		log.debug(this.id, this._id)
		return await this.save()
	}

	async updatePassword(old, password) {
		if (!this.isAuthByPass(old)) throw new ResErr('reset password',WRONG_PASSWORD);
		const res = validatePassword(password);
		let error;
		if (res.length) throw new ResErr('reset password',PASSWORD_VALIDATE_LENGTH);
		if (res.regexp) throw new ResErr('reset password',PASSWORD_VALIDATE_CHARS);
		this.setHashAuthPass(password);

		try {
			await this.save()
		} catch(e) {
			throw new ResErr('reset password',DB_ERROR,e)
		}
		return this;
	}

	// async createUser( login, password ) {
	// 	const User = monggose.model('User')
	// }

	static async createUser(login, password) {

		const User = mongoose.model('User')
		let user = new User({
			login,
			password
		})

		try {
			await user.save();
		} catch (e) {
			if (e instanceof TypeError) throw new ResErr('auth',{...TYPES_ERROR, message: e.message},e);
			// log(e)
			if (e instanceof ValidationError) {
				if (!e.errors || Object.keys(e.errors).length === 0) throw new ResErr('auth',UNKNOWN_ERROR);
				const { login : eLogin, password: ePassword } = e.errors

				// log({eLogin,ePassword})
				
				if (eLogin && eLogin instanceof ValidatorError) {
					if (eLogin.kind === 'minlength' || eLogin.kind === 'maxlength') throw new ResErr('auth',LOGIN_VALIDATE_LENGTH);
					if (eLogin.kind === 'regexp') throw new ResErr('auth',LOGIN_VALIDATE_CHARS)
				} else if (ePassword && ePassword instanceof ValidatorError) {
					if (ePassword.kind === 'minlength' || ePassword.kind === 'maxlength') throw new ResErr('auth',PASSWORD_VALIDATE_LENGTH);
					if (ePassword.kind === 'regexp') throw new ResErr('auth',PASSWORD_VALIDATE_CHARS)
				}

				throw new ResErr('auth',UNKNOWN_ERROR)
				// Object.keys(e.errors)
			} else if (e.code) {
				if (e.code === 11000) throw new ResErr('auth',LOGIN_BUSY)
			}
			throw new ResErr('auth',DB_ERROR,e)

		}
		return user
	}

	static async authUser(login, password) {
		let user;
		try {
			user = await this.getByLogin(login);
		} catch (e) {
			throw new ResErr('auth',UNKNOWN_ERROR,e)
		}
		if (!user) throw new ResErr('auth',NOT_FOUND);
		if (!user.isAuthByPass(password)) throw new ResErr('auth', WRONG_PASSWORD);
		return user
	}

	static async getByLogin(login) {
		return await this.findOne({ login })
	}

	static async getList() {
		return await this.find()
	}


}


export default UserClassDb