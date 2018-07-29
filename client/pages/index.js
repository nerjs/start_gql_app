import React from 'react'
import { Switch, Route } from 'react-router-dom'


import Home from './home'
import Auth from './auth'
import User from './user'
import ErrorRoute from './errors'
import StyledDemo from './other/styled-demo'


const PagesApp = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path="/user/:id" component={User} />
		<Route path="/~:login" component={User} />
		<Route path="/auth" component={Auth} />
		<Route path="/styled/demo" component={StyledDemo} />
		<Route component={ErrorRoute} />
	</Switch>
)


export default PagesApp