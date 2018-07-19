const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const aliases = require('../aliases')


// const NODE_ENV = 'prodaction'
const {NODE_ENV} = process.env


const src = path.join(__dirname,'../..','src');
const dirRoot = path.join(__dirname,'../..','root')


const conf = {
	context : src,
	entry : {
		core : ['fetch-polyfill','./prod.js'],
		globals : ['fetch-polyfill','./globals.js']
	},
	output : {
		filename : './js/full/[name].js',
		path : dirRoot,
		publicPath : '/'
	},
	module : {}
}



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
	    			browsers : 'last 10 versions'
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
	  			path : path.join(__dirname,'postcss.config.js'),
	  			ctx : {
	  				cssnextBrowsers : 'last 10 versions'
	  			}
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
  new ETP('./css/full/[name].css'),
  new UglifyJsPlugin({
  	sourceMap : false,
  	uglifyOptions : {
  		ecma : 6
  	}
  })
]




module.exports = conf