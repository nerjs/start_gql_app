import dotenv from './config'
import app from './app'

import routes from './routes'
import db from './db'
import gql from './gql'
import Logger from 'log'

const log = Logger('root:index')
const { SERVER_HOST, SERVER_PORT } = process.env





gql(app)
routes(app)



app.use((err, req, res, next) => {
 	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');

	// hhhr
})

app.listen(Number(SERVER_PORT), err => {
	if (err) return log.error(err);
	log.info(`Start server \n\thttp://${SERVER_HOST}:${SERVER_PORT}`)
});