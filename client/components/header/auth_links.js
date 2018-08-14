import React from 'react'
import { Link } from 'react-router-dom'

import withCu from 'hocs/cu'
import { ButtonLoader } from 'comp/loader'

const AuthLinks = ({
	loading,
	isAuth
}) => {
	if (loading) return <ButtonLoader active />
	if (isAuth) return <Link to="/auth/logout"> выход </Link>

	return (
		<React.Fragment>
			<Link to="/auth/reg"> регистрация </Link>
			 - 
			<Link to="/auth/login"> авторизация </Link>
		</React.Fragment>
	)
}

export default withCu(AuthLinks)