
const {
	VALIDATE_PASSWORD_MIN,
	VALIDATE_PASSWORD_MAX
} = process.env

export const validatePassword = password => {
	const res = {
		length : false,
		regexp: false
	}

	if (password.length < VALIDATE_PASSWORD_MIN || password.length > VALIDATE_PASSWORD_MAX) {
		res.length = true
	}
	if (!(/^[\*\<\>a-zA-Z0-9_-]+$/).test(password)) {
		res.regexp = true
	}

	return res
}