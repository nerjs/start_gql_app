import { getHash, isHash } from 'hash'



const { DB_SALT } = process.env

class UserClassDb {
	
	isAuthByPass(password) {
		return isHash(`${this.salt}-${password}-${DB_SALT}`,this.hashPassword)
	}

	setHashAuthPass(password) {
		this._plainPassword = password
		this.salt = Math.random()
		this.hashPassword = getHash(`${this.salt}-${password}-${DB_SALT}`)
	}

}


export default UserClassDb