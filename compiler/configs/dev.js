const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');

const aliases = require('../aliases')
const utils = require('../utils')
const settings = require('../settings')




const conf = {
	context : settings.from,
	entry : {
		main : './index.js'
	} ,
	output : {
		filename : './js/[name].js',
		path : settings.to,
		publicPath : '/'
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
	    	plugins : [
	    		'transform-class-properties',
	    		["transform-object-rest-spread", { "useBuiltIns": true }],
	    		'transform-runtime',
	    		['babel-plugin-styled-components',{
	    			displayName: true,
	    			fileName: true
	    		}]
	    	]
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

// -- EXTERNALS  -----------------------------

conf.externals = utils.external()

//--  PLUGINS  ----------------------------  

conf.plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new ETP('./css/[name].css')
]

conf.watch = true



module.exports = conf
