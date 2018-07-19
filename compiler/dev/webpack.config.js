const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');

const aliases = require('../aliases')


process.title = 'webpack'

const {NODE_ENV} = process.env
const WATCH = process.argv[2] && process.argv[2] == '--watch' ? true : false;


const src = path.join(__dirname,'../..','src');
const dirRoot = path.join(__dirname,'../..','root')


const conf = {
	context : src,
	entry : {
		core : ['fetch-polyfill','./prod.js'],
		globals : ['fetch-polyfill','./globals.js']
	},
	output : {
		filename : './js/dev/[name].js',
		path : dirRoot,
		publicPath : '/',
		// library : '_[name]App'
	},
	module : {}
}


//-- DEVTOOL -------------------
conf.devtool = 'inline-source-map';

//--  LOADERS ------------------------------

conf.module.rules = [{
	test: /\.js$/,
	exclude: /node_modules/,
	use : [
	  {
	    loader : 'babel-loader',
	    options : {
	    	presets : [['env',{
	    		targets : {
	    			browsers : 'last 3 versions'
	    		}
	    	}],'react'],
	    	plugins : [["transform-object-rest-spread", { "useBuiltIns": true }],'transform-runtime']
	    }
	  }
	]
},{
	test: /\.css$/,
	use: ETP.extract({
	  fallback : 'style-loader',
	  use : [{
	    loader : 'css-loader',
	    options : {
	      sourceMap : false
	    }
	  },{
	  	loader : 'postcss-loader',
	  	options : {
	  		config : {
	  			path : path.join(__dirname,'postcss.config.js')
	  		}
	  	}
	  }]
	})
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
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name : 'common'
  }),
  new ETP('./css/dev/[name].css')
]

conf.watch = WATCH;




module.exports = conf