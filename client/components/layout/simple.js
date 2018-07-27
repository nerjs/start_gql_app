import React from 'react'

import Header from 'comp/header/simple'
import List from 'comp/list'
import { Row, Col } from 'styled/grid'
import { LayoutBlock, LayoutSimpleBlock } from 'styled/typo'


const SimpleLayout = ({ children }) => (
	<LayoutBlock>
		<Header/>
		<LayoutSimpleBlock>
			{ children }
		</LayoutSimpleBlock>
	</LayoutBlock>
)

export default SimpleLayout