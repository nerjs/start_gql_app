import styled, { css } from 'styled-components';

import Open from 'icons/fa/eye'
import Close from 'icons/fa/eye-slash'

import { sizeHelper } from './helpers'

const defStyle = css`
	${sizeHelper}
	cursor: pointer;
	position: absolute;
	right: 5px;
	top: 50%;
	transform: translate(0, -50%);
	color: #000;
`

export const EyeOpen = styled(Open)`
	${defStyle}
	opacity: .7;
`
export const EyeClose = styled(Close)`
	${defStyle}
	opacity: .4;
`