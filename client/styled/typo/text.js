import styled from 'styled-components'

export const Span = styled.span`
	display: inline-block;
`

export const Text = styled.span`
	display: inline;
`

export const I = styled.i`
	display: inline;
`

export const B = styled.b`
	display: inline;
`

export const HelperText = styled.div`
	display: ${({children}) => children ? 'block': 'none'};
	font-size: 0.8em;
	color: ${({theme:{colors}})=>colors.helperText}
`