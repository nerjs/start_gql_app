const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');


const NODE_ENV = 'development'


const src = path.join(__dirname,'src');
const dirJs = path.join(__dirname,'root','js')


const conf = {
	context : path.join(__dirname,'src'),
	entry : {
		core : [
	    	'react-hot-loader/patch',
	    	'webpack-hot-middleware/client',
			'./index.js'
		],
		test : './test.js'
	},
	output : {
		filename : './js/[name].js',
		path : path.join(__dirname,'root'),
		publicPath : '/',
		library : '[name]App'
	},
	module : {}
}

//-- DEVTOOL -------------------
conf.devtool = 'inline-source-map';
//

//--  LOADERS ------------------------------

conf.module.rules = [{
	test: /\.js$/,
	exclude: /node_modules/,
	//include: /build/,
	use : [
	  {
	    loader : 'babel-loader',
	    options : {
	      //presets : ['react','es2015'],
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
	  }]
	}),
// },{
// 	test : /\.css$/,
// 	use : [{
// 		loader : 'style-loader'
// 	},{
// 		loader : 'css-loader'
	// }]
}]

//--  PLUGINS  ----------------------------  

conf.plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name : 'common'
  }),
  new ETP('./css/[name].css'),
  // new webpack.NamedModulesPlugin(),
  // new webpack.HotModuleReplacementPlugin()
 //  new webpack.HotModuleReplacementPlugin({
	//   // Options...
	// })

]


// conf.devServer = {
//   contentBase: path.join(__dirname, "/root"),
//   compress: false,
//   port: 9000
// }


conf.watch = true

  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings:     false,
  //     drop_console: true,
  //     unsafe:       true
  //   }
  // })
// exports.resolve = {
//   alias : {
//     css    : path.join(build,'css'),
//     c      : path.join(build,'comp'),
//     config   : path.join(build,'config'),
//     routes   : path.join(build,'routes'),
//     v : path.join(build,'vendor')
//   }
// }

// console.dir(conf,{colors:true})

module.exports = conf;