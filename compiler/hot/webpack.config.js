const path = require('path');
const webpack = require('webpack');

const aliases = require('../aliases')

const NODE_ENV = 'development'


const src = path.join(__dirname,'../..','src');
const dirRoot = path.join(__dirname,'../..','root')


const conf = {
	context : src,
	entry : {
		core : [
	    	'react-hot-loader/patch',
	    	'webpack-hot-middleware/client',
			'fetch-polyfill',
			'./hot.js'
			]
	},
	output : {
		filename : './js/hot/core.js',
		path : dirRoot,
		publicPath : '/',
		library : 'hotApp'
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
	use : ['style-loader','css-loader',{
		loader : 'postcss-loader',
		options : {
			config : {
				path : path.join(__dirname,'postcss.config.js')
			}
		}
	}]
}]


conf.externals = {
	react : '_GLOB_.React',
	'react-dom' : '_GLOB_.ReactDom',
	'react-router' : '_GLOB_.reactRouter',
	'react-router-dom' : '_GLOB_.reactRouterDom',
	redux : '_GLOB_.redux',
	'react-redux' : '_GLOB_.reactRedux',
	'socket.io-client' : '_GLOB_.socketIoClient',
}

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
  new webpack.HotModuleReplacementPlugin()
]




module.exports = conf