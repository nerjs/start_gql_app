import React from 'react'
import { Link } from 'react-router-dom'

import { Header } from 'styled/typo'
import { Row, Col } from 'styled/grid'

class CoreHeader extends React.Component {

	render() {

		return (
			<Header>
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
			</Header>
		)
	}
}

export default CoreHeader