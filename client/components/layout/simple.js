import React from 'react'

import Header from 'comp/header/simple'
import List from 'comp/list'
import { Row, Col } from 'styled/grid'
import { LayoutBlock, LayoutSimpleBlock } from 'styled/typo'
import { SimplePageCard } from 'styled/typo'


const SimpleLayout = ({ children }) => (
	<LayoutBlock>
		<Header/>
		<LayoutSimpleBlock>
			<SimplePageCard>
				{ children }
			</SimplePageCard>
		</LayoutSimpleBlock>
	</LayoutBlock>
)

export default SimpleLayout