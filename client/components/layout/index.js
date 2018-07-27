import React from 'react'

import Header from 'comp/header'
import List from 'comp/list'
import { Row, Col } from 'styled/grid'
import { LayoutBlock } from 'styled/typo'


const Layout = ({ children }) => (
	<LayoutBlock>
		<Header/>
		<Row noWrap >
			<Col visible={{
				xs : false,
				md : true
			}} md={25} 
				pix={{
					lg: 350
				}}>
				<List/>
			</Col>
			<Col xs={100} md={75} lg={100}>
				{ children }
			</Col>
		</Row>
	</LayoutBlock>
)

export default Layout