import React from 'react'
import { Link } from 'react-router-dom'

import { SimpleHeader } from 'styled/typo'
import { Row, Col } from 'styled/grid'

import AuthLinks from './auth_links'
import withCu from 'hocs/cu'

class SimpleHeaderComponent extends React.Component {

	render() {

		return (
			<SimpleHeader>
				<Row>
					<Col name="left" visible={{
						xs: false,
						md: true
					}} md={50} >
						<Link to="/" > Home </Link>
						{this.props.login || null}
					</Col>
					<Col name="right" xs={100} md={50}>
						<AuthLinks/>
					</Col>
				</Row>
			</SimpleHeader>
		)
	}
}

export default withCu(SimpleHeaderComponent)