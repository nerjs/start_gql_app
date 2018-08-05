import styled, {css} from 'styled-components'
import Load from 'icons/io/load-a'

import { spin } from 'styled/animate'


export const IconLoad = styled(Load)`
	width: ${({size})=>size || 20}px;
	height: ${({size})=>size || 20}px;
	z-index: ${({z})=>z || 1};
	${({spin})=>spin?css`
		color: red;
	` : ''}
`

export const IconLoadFixed = styled(IconLoad)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(${({size})=>{
		const tr = (size || 20) / 2;
		return `-${tr}px, -${tr}px`
	}});
`

export const IconLoadFixedSpin = styled(IconLoadFixed)`
	& g {
		animation: ${spin} 1s linear infinite;
		transform-origin: center;
	}
`
export const IconLoadSpin = styled(IconLoad)`
	& g {
		animation: ${spin} 1s linear infinite;
		transform-origin: center;
	}
`