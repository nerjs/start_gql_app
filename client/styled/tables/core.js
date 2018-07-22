import React from 'react'
import styled from 'styled-components'

export const TableNative = styled.table`
	display: table;
	font-size: 100%;
	width: 100%;
`

export const Thead = styled.thead`
	font-size: 110%;
	font-weight: bold;
`

export const Tbody = styled.tbody`
	font-size: 100%;
`

export const Tfoot = styled.tfoot`
	font-size: 90%;
	font-style: italic;
`

export const Table = props => (
	<TableNative {...props}>
		<Tbody>
			{props.children}
		</Tbody>
	</TableNative>
)

export const Tr = styled.tr`
	background: rgba(0,0,0,.2);
`

export const Td = styled.td`
	background: rgba(255,255,255,.2);
`

export const Th = styled.th`
	background: rgba(0,0,0,.7);
	color: #fff;
`