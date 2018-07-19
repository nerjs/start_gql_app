const path = require('path');
const webpack = require('webpack');

const aliases = require('../aliases')

const {NODE_ENV} = process.env;


const src = path.join(__dirname,'../..','src');
const dirRoot = path.join(__dirname,'../..','root')


const conf = {
	context : src,
	entry : {
		globals : ['fetch-polyfill','./globals.js']
	},
	output : {
		filename : './js/dev/globals.js',
		path : dirRoot,
		publicPath : '/',
		library : '_GLOB_'
	},
	module : {}
}


//--  LOADERS ------------------------------

conf.module.rules = [{
	test: /\.css$/,
	use : ['style-loader','css-loader']
}]





// -- ALIASES ---------------------
conf.resolve = {
	alias : aliases
}

//--  PLUGINS  ----------------------------  

conf.plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  })
]




module.exports = conf