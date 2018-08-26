import React from 'react';

const getLog = function(name) {
	return function() {
		console[name].apply(console,arguments)
	}
}

const getLogs = arr => {
	const res = {};
	arr.forEach(n => {
		res[n] = getLog(n)
	})

	res.confirm = confirm
	
	return res
}

export const Provider = ({children}) => (<div>{children}</div>)
export default getLogs(['info','warn','error'])
