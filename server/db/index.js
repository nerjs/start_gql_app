import mongoose from 'mongoose'
import connection from './connect'

import Logger from 'log'
import User from './user'

const log = Logger('db:index')



// log(new mongoose.Schema.ObjectId(12))

// try {
// 	// const id = new mongoose.Types.ObjectId('5b4b411100689c192c8250d2')
// 	// log((new User).zzz())
// 	// log(id)
// 	User.getById('5b4b4ea100689c192c8250d2',{ avatar: '5b4b78dd53623b34f60c28ed' }).then(user => {
// 		log.info(user.avatar.id)

// 		// user.avatar = '5b4b78dd53623b34f60c28ed'
// 		// user.avatar = '5b4b78dd53623b34f60c28ee'

// 		// user.setAvatar('5b4b78dd53623b34f60c28ed').then(log.debug).catch(log)

// 	}).catch(log)
// } catch(e) {
// 	log.debug('******************')
// 	log(e)
// }

// User.findByIdAndUpdate(mongoose.Types.ObjectId('5b4b4ea100689c192c8250d2'),{
// 	sex: 3
// }).then(log).catch(log)
// User.getList().then(log.info).catch(log.error)
// log(mongoose.model('User').createUser())
// log(mongoose.model('User'))
// log.info('DB started')

export default {
	User
}