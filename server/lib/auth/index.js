

import SessAuth from './sess'


export default (req, res, next) => {
	req.user = new SessAuth(req, res, next)
}