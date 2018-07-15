import Logger from 'log'
import ResErr, {
	parseError,
	DB_ERROR,
	UNKNOWN_ERROR,
	TYPES_ERROR,
	LOGIN_BUSY,
	NOT_FOUND
} from 'errors'

const {
	SERVER_HOST,
	SERVER_PORT
} = process.env

const log = Logger('gql:user')

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
		users: async (parent, args, { db, user }) => {
			let list = [];
			log(user)
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
		createUser: async (parent, { login, password }, { db }) => {
			let user;

			user = await db.User.findOne( { login } )

			if (user) return {
				status: false,
				error : new ResErr('user', LOGIN_BUSY)
			}
			
			try {
				user = new db.User({
					login,
					password,
					email: `${Math.random()}`,
					timeCreate: new Date(),
					timeUpdate: new Date()
				})

				await user.save()
			} catch(e) {
				log(e)
				return {
					status: false,
					error: new ResErr('user',DB_ERROR)
				}
			}

			return {
				status: true,
				user
			}
		},
		authUser: async (parent, { login, password }, { db }) => {
			try {
				const user = await db.User.authUser(login, password);
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