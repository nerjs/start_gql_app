
export class UnknownError extends Error {
	constructor(type) {
		const message = 'Unknown Error';
		super(message)
		this.code = -1;
		this.type = type;
		this.message = message
	} 
}

export class ServerError extends Error {
	constructor(err) {
		const message = err.message;
		super(message)

		this.message = message;

		this.code = err.code || -2;
		this.type = 'server'

		Object.keys(err).forEach(key => {
			this[key] = err[key]
		})

		if (process.env.NODE_ENV === 'development') {
			console.error(this)
		}
	}
}