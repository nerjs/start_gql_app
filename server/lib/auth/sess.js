import jwt from 'jsonwebtoken'

import Logger from 'log'
import db from '../../db'

const log = Logger('auth:user')

const {
	NODE_ENV,
	COOKIE_SESSION_NAME,
	COOKIE_TOKEN_NAME,
	COOKIE_TOKEN_REFRESH_NAME,
	JWT_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
	SESSION_SECRET,
	SERVER_HOST,
	SERVER_PORT
} = process.env

const TOKEN_EXP = 15*60*1000
const REFRESH_TOKEN_EXP = 7*24*60*60*1000
const SESSION_EXP = 24*60*60*1000

class SessAuth {
	constructor(req, res, next) {
		this.id = null;
		this.data = {}
		this.req = req;
		this.res = res;
		this.req.sess = this;

		this.getSession()
		this.sessionParse(next)
	}

	setSession(data) {
		try {
			this.data = {...this.data, ...data}
			const sess = jwt.sign(this.data, SESSION_SECRET);
			this.res.cookie(COOKIE_SESSION_NAME,sess,{
				maxAge: SESSION_EXP,
				httpOnly: true
			})
		} catch(e) {
			if (NODE_ENV === 'development') log.error(e)
		}
	}

	dropSession(arr) {
		if (!arr) return;
		if (arr && !Array.isArray(arr)) return this.dropSession(Object.keys(this.data));
		if (arr && typeof arr == 'string') return this.dropSession([arr])
		if (!Array.isArray(arr)) return;

		const data = {};
		Object.keys(this.data).forEach( key => {
			if (arr.indexOf(key) < 0) {
				data[key] = this.data[key]
			}
		})

		this.data = data;
		this.setSession({})
	}

	getSession() {
		let data = {}
		if (this.req.cookies[COOKIE_SESSION_NAME]) {
			try {
				let data = jwt.verify(this.req.cookies[COOKIE_SESSION_NAME], SESSION_SECRET)
			} catch(e) {
				if (NODE_ENV === 'development') log.error(e)
			}
		}

		this.setSession(data)
	}

	setTokens(token, refreshToken) {
		if (token) {
			this.res.cookie(COOKIE_TOKEN_NAME,token,{
				maxAge: TOKEN_EXP,
				httpOnly: true,
				sameSite: false
			})
		}
		if (refreshToken) {
			this.res.cookie(COOKIE_TOKEN_REFRESH_NAME,refreshToken,{
				maxAge: REFRESH_TOKEN_EXP,
				httpOnly: true
			})
		}
	}

	dropTokens() {
		this.res.cookie(COOKIE_TOKEN_NAME,'',{
			expires: new Date(Date.now() - 1000),
			httpOnly: true,
		})
		this.res.cookie(COOKIE_TOKEN_REFRESH_NAME,'',{
			expires: new Date(Date.now() - 1000),
			httpOnly: true
		})

		this.id = null;
	}

	async addTokens(id, hashPass) {
		if (!id) throw new Error('ID must be aString')
		let rts;
		if (hashPass) {
			rts = `${hashPass}_${JWT_REFRESH_TOKEN_SECRET}`
		} else {
			try {
				const { hashPassword } = await db.User.getById(id)
				rts = `${hashPassword}_${JWT_REFRESH_TOKEN_SECRET}`
			} catch(e) {
				if (NODE_ENV === 'development') log.error(e)
			}
		}

		if (id && rts) {
			const { token, refreshToken } = this.createTokens({ id }, rts)
			this.setTokens(token, refreshToken);
			this.id = id;
			return true
		}
		return false;
	}

	async sessionParse(next) {
		let userId;
		let cookieArg;
		let dbArg;

		if (this.req.cookies[COOKIE_TOKEN_NAME]) {
			try {
				cookieArg = jwt.verify(this.req.cookies[COOKIE_TOKEN_NAME], JWT_TOKEN_SECRET)
				userId = cookieArg.id
			} catch(e){
				if (NODE_ENV == 'development') log.error(e)
			}
		}


		if (!userId && this.req.cookies[COOKIE_TOKEN_REFRESH_NAME]) {
			try {
				cookieArg = jwt.decode(this.req.cookies[COOKIE_TOKEN_REFRESH_NAME]);
				if (cookieArg.id) {
					dbArg = await db.User.getById(cookieArg.id);
					if (dbArg && dbArg.hashPassword) {
						cookieArg = jwt.verify(this.req.cookies[COOKIE_TOKEN_REFRESH_NAME], `${dbArg.hashPassword}_${JWT_REFRESH_TOKEN_SECRET}`);
						if (cookieArg.id && cookieArg.id === dbArg.id) {
							userId = dbArg.id
							const { token, refreshToken } = this.createTokens({ id: dbArg.id }, `${dbArg.hashPassword}_${JWT_REFRESH_TOKEN_SECRET}`)
							this.setTokens(token, refreshToken)
						}
					}
				}
			} catch(e) {
				if (NODE_ENV == 'development') log.error(e)
			}
		}


		this.id = userId || null;
		next()

	
	}



	createTokens(args, rts) {
		try {
			const token = jwt.sign({...args}, JWT_TOKEN_SECRET, { expiresIn: TOKEN_EXP/1000 })
			const refreshToken = jwt.sign({...args}, rts, { expiresIn: REFRESH_TOKEN_EXP/1000 })
			return { token, refreshToken }
		} catch(e) {
			if (NODE_ENV == 'development') log.error(e)
			return {}
		}
	}


}


export default SessAuth