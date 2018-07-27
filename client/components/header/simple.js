import React from 'react'
import { Link } from 'react-router-dom'

import { SimpleHeader } from 'styled/typo'
import { Row, Col } from 'styled/grid'

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
					</Col>
					<Col name="right" xs={100} md={50}>
						<Link to="/auth/reg"> регистрация </Link>
						 - 
						<Link to="/auth/login"> авторизация </Link>
						 - 
						<Link to="/auth/logout"> выход </Link>
					</Col>
				</Row>
			</SimpleHeader>
		)
	}
}

export default SimpleHeaderComponent