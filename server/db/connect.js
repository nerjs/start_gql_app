import mongoose from 'mongoose'

import Logger from 'log'
const log = Logger('db:connect')

const {
	DB_NAME
} = process.env 

mongoose.connect(DB_NAME, {
	useNewUrlParser : true
}).then( db => {
	log.info('DB CONNECT')
}).catch( err => {
	log.error(err)
})


mongoose.connection.on('error', err => {
	log.error(err)
})


export default mongoose.connection
// log(connect, connection)