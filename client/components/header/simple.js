import React from 'react'
import { Link } from 'react-router-dom'

import { SimpleHeader } from 'styled/typo'
import { Row, Col } from 'styled/grid'

import AuthLinks from './auth_links'
import withCu from 'hocs/cu'

class SimpleHeaderComponent extends React.Component {
	getUser() {
		const { loading, loaded, isAuth, userData, userId } = this.props;
		if (loading || !loaded) return 'Loading...';
		if (!isAuth) return 'Not Authorized';
		if (userData && userData.displayName) return (
				<Link to={`/user/${userId}`}>
					{userData.displayName}
				</Link>
			);
		return null;
	}
	render() {

		return (
			<SimpleHeader>
				<Row>
					<Col name="left" visible={{
						xs: false,
						md: true
					}} md={50} >
						<Link to="/" > Home </Link> 
						{this.getUser()}
					</Col>
					<Col name="right" xs={100} md={50}>
						<AuthLinks />
					</Col>
				</Row>
			</SimpleHeader>
		)
	}
}

export default withCu(SimpleHeaderComponent)