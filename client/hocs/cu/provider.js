import React from 'react'
import gql from "graphql-tag";
import { compose, graphql } from 'react-apollo';

import gqlUserPing from './gqls/user_ping.gql'
import { loginUser, registerUser } from './gqls/update_user.gql'
import { UnknownError, ServerError } from 'utils/error'
import send from 'utils/send'


import { Provider } from './context'


class CurrentUserProvider extends React.Component {
	state = {
		loading: null,
		userData : {},
		loaded: false,
		userId: null,
		error: null,
		isAuth : false
	}

	componentDidMount() {
		const { data: { userPing, loading}} = this.props
		this.updateState(userPing, 'userPing', loading)
	}

	componentDidUpdate(oldProps) {
		if (this.state.loading !== this.props.data.loading) {
			const { data: { userPing, loading}} = this.props
			this.updateState(userPing, 'userPing', loading)
		}
	}

	updateState(data, type, loading, oError) {
		if (this.state.loading !== loading) this.setState({ loading });
		if (!this.state.loaded && !loading) this.setState({ loaded: true });

		if (oError) {
			this.setState({ error: oError})
		}
		if (!data) return;
		const { status, user, error } = data;
		if (status && user) {
			this.setState({
				isAuth: true,
				userData : user,
				userId: user.id,
				error: null
			})
		} else if (!status && error) {
			this.setState({
				isAuth : false,
				userData : {},
				userId: null,
				error,
			})
		} else {
			this.setState({
				isAuth: false,
				userData : {},
				userId: null,
				error: new UnknownError(type)
			})
		}
	}

	updateMoveState(data, type, loading, oErr) {
		this.updateState(data, type, loading, oErr)
		if (!data && oErr) throw oErr;
		if (!data) return false;
		const { status, user, error} = data
		if (!status) throw error;
		return user;
	}

	loginUser = async ({ login, password }) => {
		if (!login || !password) throw { message: 'Пустой запрос'};
		this.updateMoveState(null,'login',true)

		try {
			let { data : { loginUser : data }} = await this.props.loginUser({
				variables : {login, password}
			})
			return this.updateMoveState(data,'login',false)

		} catch(e) {
			const sErr = new ServerError(e)
			this.updateMoveState(null, login, false, sErr)
		}
	}

	registerUser = async ({ login, password }) => {
		if (!login || !password) throw { message: 'Пустой запрос'};
		this.updateMoveState(null,'login',true)

		try {
			let { data : { loginUser : data }} = await this.props.registerUser({
				variables : {login, password}
			})
			return this.updateMoveState(data,'login',false)

		} catch(e) {
			const sErr = new ServerError(e)
			this.updateMoveState(null, login, false, sErr)
		}
	}

	removeUser = () => {
		if (!send.confirm('Выйти?')) return;
		this.setState({
			isAuth: false,
			login: null
		})
	}

	getValue() {
		const { loginUser, registerUser, removeUser } = this
		return {
			loginUser,
			registerUser,
			removeUser,
			...this.state
		}
	}

	render() {
		return (
			<Provider value={this.getValue()}>
				{this.props.children}
			</Provider>
		)
	}
}

export default compose(
	graphql(gqlUserPing),
	graphql(loginUser, {
		name: 'loginUser'
	}),
	graphql(registerUser, {
		name: 'registerUser'
	})
	// graphql(gqlUpdateUser, {
	// 	name: 'Z'
	// })
)(CurrentUserProvider)
// export default graphql(gqlUserPing)(CurrentUserProvider)