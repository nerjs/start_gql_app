import React from 'react'

import { Provider } from './context'

class CurrentUserProvider extends React.Component {
	state = {
		isAuth : false,
		login: null
	}

	createUser = ({ login }) => {
		this.setState({isAuth: true, login})
	}

	removeUser = () => {
		this.setState({
			isAuth: false,
			login: null
		})
	}

	getValue() {
		return {
			createUser: this.createUser,
			removeUser : this.removeUser,
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

export default CurrentUserProvider