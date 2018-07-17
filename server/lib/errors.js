const {
	NODE_ENV,
	VALIDATE_LOGIN_MIN,
	VALIDATE_LOGIN_MAX,
	VALIDATE_PASSWORD_MIN,
	VALIDATE_PASSWORD_MAX
} = process.env


//////////////////
// ОБЩИЕ ОШИБКИ //
//////////////////

export const CUSTOM_ERROR = {
	code: 0,
	message: 'custom error'
}

export const UNKNOWN_ERROR = {
	code: 1,
	message: 'unknown error'
}

export const TYPES_ERROR = {
	code: 2,
	message: 'TypeError'
}

export const SERVER_ERROR = {
	code : 3,
	message: 'server error'
}

export const BAD_QUERY = {
	code: 4,
	message: 'bad query'
}

export const NOT_FOUND = {
	code: 5,
	message: 'Not found'
}

export const DB_ERROR = {
	code: 6,
	message: 'DB error'
}

export const LOGIN_BUSY = {
	code: 7,
	message: 'Login busy'
}

export const WRONG_PASSWORD = {
	code: 8,
	message: 'wrong password'
}


//////////////////////////
// ВАЛИДАЦИОННЫЕ ОШИБКИ //
//////////////////////////

export const LOGIN_VALIDATE_LENGTH = {
	code: 101,
	message: `Login must be between ${VALIDATE_LOGIN_MIN} and ${VALIDATE_LOGIN_MAX} characters long`
}

export const LOGIN_VALIDATE_CHARS = {
	code: 102,
	message: 'The login must contain only letters [a-zA-Z], numbers [0-9] and symbols _-'
}

export const PASSWORD_VALIDATE_LENGTH = {
	code: 103,
	message: `Password must be between ${VALIDATE_PASSWORD_MIN} and ${VALIDATE_PASSWORD_MAX} characters long`
}

export const PASSWORD_VALIDATE_CHARS = {
	code: 104,
	message: 'The password must contain only letters [a-zA-Z], numbers [0-9] and symbols _-*<>'
}

////////////////////
// ПРЕДУПРЕЖДЕНИЯ //
////////////////////

export const USER_IS_AUTH = {
	code: 201,
	message: 'the user is already authorized'
}

export const NOT_AUTHORIZED = {
	code: 202,
	message: 'the user is not authorized'
}








const _parseError = message => {
	if (!message) return { ...UNKNOWN_ERROR };
	if (typeof message === 'string') return { ...CUSTOM_ERROR, message};
	if (typeof message !== 'object') return { ...UNKNOWN_ERROR };
	return {
		code: message.code || 0,
		message: message.message || 'custom error'
	}
}

class ResolverError {
	constructor(type, mess, details) {
		const { code, message } = _parseError(mess)
		this.code = code;
		this.message = message;
		this.type = type || 'custom'


		if (details) {
			if (Array.isArray(details)) {
				this.details = [...details]
			} else if (details instanceof Error) {
				this.original = details;
				if (NODE_ENV === 'development') {
					this.message = details.message
				}
			}
		}

	}

}

export const parseError = (type, err) => {
	if (err instanceof ResolverError) return err;
	return new ResolverError(type, UNKNOWN_ERROR, err)
}

export default ResolverError