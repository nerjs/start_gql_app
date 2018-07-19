console.log(process.env.NODE_ENV)
module.exports = [
	require('./full.webpack.config'),
	require('./sh.webpack.config')
]