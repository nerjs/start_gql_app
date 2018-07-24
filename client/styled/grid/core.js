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
	flex-wrap: wrap;
`


export const Col = styled(clearDiv)`
	${parseMedia}
`