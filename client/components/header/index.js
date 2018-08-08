import React from 'react'
import { Link } from 'react-router-dom'

import { Header } from 'styled/typo'
import { Row, Col } from 'styled/grid'

import withCu from 'hocs/cu'
import AuthLinks from './auth_links'


class CoreHeader extends React.Component {

	render() {
		return (
			<Header>
				<Row>
					<Col name="left" visible={{
						xs: false,
						md: true
					}} md={50} >
						<Link to="/" > Home  </Link>
						{this.props.login || null}
					</Col>
					<Col name="right" xs={100} md={50}>
						<AuthLinks/>
					</Col>
				</Row>
			</Header>
		)
	}
}

export default withCu(CoreHeader)