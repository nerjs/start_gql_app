import styled from 'styled-components';

import { clearDiv, schemaWidth } from 'styled/helpers'

export const Div = styled.div`
	display: block;
`

export const Section = styled.section`
	display: block;
`


export const Article = styled.article`
	display: block;
`


export const LayoutBlock = styled(clearDiv)`
	display: block;
`

export const LayoutSimpleBlock = styled(clearDiv)`
	position: relative;
	${schemaWidth({
		xs: '100%',
		sm: 500
	})}
	margin: 5px 0;

	@media (min-width: ${props => props.theme.bp.sm}px) {
		margin-left: 50%;
		transform: translate(-50%, 0);
	}
`