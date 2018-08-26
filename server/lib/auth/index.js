

import SessAuth from './sess'


export default (req, res, next) => {
	console.log('auth: ',req.cookies)
	res.cookie('test','qwerty',{
		maxAge: Date.now() + 10000000,
		domain: 'localhost'
	})
	res.cookie('test2','qwerty',{
		maxAge: Date.now() + 10000000,
		httpOnly: true,
		domain: 'localhost:8887'
	})
	req.user = new SessAuth(req, res, next)
}