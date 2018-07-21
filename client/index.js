import React from 'react'
import { render } from 'react-dom'

import App from './app'

// let App = require('./app').default

const domId = document.getElementById('root')



render(<App />, domId);


render(App)

if(module.hot) {
	module.hot.accept('./app',()=>{
		let NewApp = require('./app').default
		render(NewApp)
	})
}