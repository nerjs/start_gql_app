import React from 'react'
import gql from "graphql-tag";
import { graphql } from 'react-apollo';

import { UnknownError } from 'utils/error'

// console.log(new UnknownError('userPing'))
const userPing = gql`{
  userPing {
    status
    user {
      id
      login
      displayName
      sex
    }
    error {
      code
      type
      message
    }
  }
}
`

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
		this.updateState()
	}

	componentDidUpdate(oldProps) {
		if (this.state.loading !== this.props.data.loading) {
			this.updateState()
		}
	}

	updateState() {
		const { data : {loading, userPing}} = this.props;
		if (this.state.loading !== loading) this.setState({ loading });
		if (!this.state.loaded && !loading) this.setState({ loaded: true });
		if (!userPing) return;
		const { status, user, error } = userPing;
		console.log({ status, user, error })
		if (status && user) {
			this.setState({
				isAuth: true,
				userData : user,
				userId: user.id,
				error: null
			})
		} else if (!status && error) {
			this.setState({ isAuth: false, error })
		} else {

			this.setState({
				isAuth: false,
				error: new UnknownError('userPing')
			})
		}
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
		console.log('cu render ',this.state)
		return (
			<Provider value={this.getValue()}>
				{this.props.children}
			</Provider>
		)
	}
}

export default graphql(userPing)(CurrentUserProvider)