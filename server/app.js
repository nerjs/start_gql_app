import express from 'express'
import * as path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';


import authMdw from 'auth'

const app = express()



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// webpack/react hot loader
// if (config.hot) {
// 	require('./compiler/hot_uses')(app)
// }

app.use(express.static(path.join(__dirname, 'root')));

app.use(authMdw)
export default app