import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from 'comp/layout/simple'
import AuthReg from './reg'
import AuthLogin from './login'
import AuthLogout from './logout'

const Auth = () => (
	<Layout>
		<Switch>
			<Route path="*/reg" component={AuthReg}/>
			<Route path="*/login" component={AuthLogin}/>
			<Route path="*/logout" component={AuthLogout}/>
		</Switch>
	</Layout>
)


export default Auth