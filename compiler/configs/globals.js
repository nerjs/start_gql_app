const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');
const settings = require('../settings')
const gf = require('./g_f')

const filePath = gf(settings)




const conf = {
	entry : {
		globals : filePath
	},
	output : {
		filename : '[name].js',
		path : settings.to + '/js',
		library : settings.globalName
	},
	module : {}
}


//-- DEVTOOL -------------------

//--  LOADERS ------------------------------


//--  PLUGINS  ----------------------------  

conf.plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]





module.exports = conf