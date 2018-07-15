

import UserAuth from './user'


export default (req, res, next) => {
	req.user = new UserAuth(req, res)
	next()
}