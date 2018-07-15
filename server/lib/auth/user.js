import jwt from 'jsonwebtoken'

const {
	COOKIE_SESSION_NAME,
	COOKIE_TOKEN_NAME,
	COOKIE_TOKEN_REFRESH_NAME,
	JWT_TOKEN_SECRET,
	JWT_REFRESH_TOKEN
} = process.env

const TOKEN_EXP = 15*60*1000
const REFRESH_TOKEN_EXP = 7*24*60*60*1000
const SESSION_EXP = 7*24*60*60*1000

class UserAuth {
	constructor(req, res) {
		this.id = null;
		this.firstVisit = null;
		this.lastVisit = null;
		this.countVisit = 0;
		this.req = req;
		this.res = res;

		this.sessionParse()
		this.authParse()
	}

	sessionParse() {
		if (this.req.cookies[COOKIE_SESSION_NAME]) {
			try {
				const { _fv, _lv, _cv } = JSON.parse(this.req.cookies[COOKIE_SESSION_NAME])
				this.firstVisit = Number(_fv) ? new Date(Number(_fv)) : new Date;
				this.lastVisit = Number(_lv) ? new Date(Number(_lv)) : new Date;
				this.countVisit = Number(_cv) || 1;
			} catch(e){}
		}

		this.res.cookie(COOKIE_SESSION_NAME, JSON.stringify({
			_fv: this.firstVisit && this.firstVisit.getTime ? this.firstVisit.getTime() : Date.now(),
			_lv: Date.now(),
			_cv : this.countVisit + 1
		}),{
			maxAge : SESSION_EXP
		})
	}

	authParse() {
		
	}
}


export default UserAuth