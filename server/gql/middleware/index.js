import anonim from './anonim'
import isAuth from './is_auth'

export default {
	Query: {
		userPing: isAuth('ping')
	},
	Mutation: {
		loginUser: anonim('auth'),
		createUser: anonim('auth'),
		logoutUser: isAuth('auth')
	}
}