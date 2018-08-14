
export class UnknownError extends Error {
	constructor(type) {
		const message = 'Unknown Error';
		super(message)
		this.code = -1;
		this.type = type;
		this.message = message
	} 
}