
// webpack hot
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const wConf = require('./hot/webpack.config')

const compiler = webpack(wConf)


module.exports = app => {
	app.use(webpackDevMiddleware(compiler, {
	  publicPath: wConf.output.publicPath,
	  noInfo: true,
	  stats: {
	    colors: true,
	  },
	}));
	app.use(webpackHotMiddleware(compiler));
	
}