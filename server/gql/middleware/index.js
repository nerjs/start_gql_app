import anonim from './anonim'
import isAuth from './private'

export default {
	Query: {
		
	},
	Mutation: {
		loginUser: anonim('auth'),
		createUser: anonim('auth'),
		logoutUser: isAuth('auth')
	}
}