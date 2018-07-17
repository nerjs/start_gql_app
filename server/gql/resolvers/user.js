import Logger from 'log'
import ResErr, {
	parseError,
	DB_ERROR,
	UNKNOWN_ERROR,
	TYPES_ERROR,
	LOGIN_BUSY,
	NOT_FOUND,
	USER_IS_AUTH
} from 'errors'

const {
	SERVER_HOST,
	SERVER_PORT
} = process.env

const log = Logger('gql:user',{depth:2,showHidden:true})

export default {
	Query: {
		user: async (parent, { id, login }, { db }) => {
			let user;

			try {
				if (id) {
					user = await db.User.getById(id);
				} else if (login) {
					user = await db.User.getByLogin(login);
				}				
			} catch (e) {}
			return user
		},
		users: async (parent, args, { db }) => {
			let list = [];
			try {
				list = await db.User.getList(args);
			} catch (e) {}

			return list
		},
		userAvatars: async (parent, { id }, { db }) => {
			const user = await db.User.getById(id);
			return user.allAvatars;
		}
	},
	Mutation: {
		createUser: async (parent, { login, password }, { db, sess }) => {
			let user;

			user = await db.User.findOne( { login } )

			if (user) return {
				status: false,
				error : new ResErr('user', LOGIN_BUSY)
			}
			
			try {
				user = new db.User({
					login,
					password
				})

				await user.save()
			} catch(e) {
				log(e)
				return {
					status: false,
					error: new ResErr('user',DB_ERROR)
				}
			}
			
			await sess.addTokens(user.id, user.hashPassword)
			return {
				status: true,
				user
			}
		},
		loginUser: async (parent, { login, password }, { db, sess }) => {

			try {
				const user = await db.User.authUser(login, password);
				if (!user) return {
					status: false,
					error: new ResErr('auth', NOT_FOUND)
				}

				await sess.addTokens(user.id, user.hashPassword)
				return {
					status: true,
					user
				}
			} catch(error) {
				return {
					status: false,
					error
				}
			}
		},
		logoutUser: async (parent, args, { sess }) => {
			sess.dropTokens();
			return { status: true }
		},
		updateUser: async (parent, { id, ...args }, { db }) => {
			try {
				const user = await db.User.updateById(id, args);
				return {
					status: true,
					user
				}
			} catch (error) {
				return {
					status: false,
					error
				}
			}
		},
		updateUserPassword: async (parent, { id, oldPassword, newPassword }, { db }) => {
			let user;
			try {
				user = await db.User.getById(id)
			} catch(error) { 
				return {
					status: false,
					error
				}
			}
			
			if (!user) {
				return {
					status: false,
					error: new ResErr('user',NOT_FOUND)
				}
			}

			try {
				await user.updatePassword(oldPassword, newPassword);
				return {
					status: true,
					user
				}
			} catch(e) {
				return {
					status: false,
					error: e
				}
			}
		}
	},
	User : {
		displayName: (parent) => parent.displayName || parent.login
	},
	Avatar: {
		uri: parent => parent.host ? `http://${SERVER_HOST}:${SERVER_PORT}${parent.uri}` : parent.uri
	}
}