import styled from 'styled-components'

import {
	clearBox,
	clearDiv
} from '../helpers'

import {
	parseMedia
} from './helpers'

export const Flex = styled.div`
	display: ${props=>props.inline ? 'inline-flex' : 'flex'};
	flex-direction: ${props => props.column ? 'column' : 'row'}
`

export const Row = styled(clearDiv)`
	display: flex;
	width: 100%;
	max-width: 100%;
	min-width: 100%;
	flex-wrap: ${props => props.noWrap ? 'nowrap': 'wrap'};
`


export const Col = styled(clearDiv)`
	${parseMedia}
	outline: 1px solid orange;
`

export const Test = styled.div`
	background: rgba(100,100,${(props)=>{
		return parseInt(props.theme.width / 5)
	}},.9);
`