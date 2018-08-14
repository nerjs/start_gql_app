const path = require('path');


exports.from = path.join(__dirname, '../client')
exports.to = path.join(__dirname, '../file_server/files')

exports.globalName = '__GLOBAL__'
exports.globals = [
	'react', 
	'react-dom', 
	// 'redux', 
	// 'react-redux', 
	// 'create-redux-store', 
	'styled-components',
	'react-router',
	'react-router-dom',
	'formik',
	'yup',
	'react-apollo',
	'apollo-client',
	'apollo-cache-inmemory',
	'apollo-link-http',
	'apollo-link',
	'apollo-link-state',
	'apollo-link-error',
	'apollo-boost',
	'graphql-tag'
]

