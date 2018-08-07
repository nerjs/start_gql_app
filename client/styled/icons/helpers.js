import { css } from 'styled-components'


export const sizeHelper = css`
	width: ${({size})=>size || 20}px;
	height: ${({size})=>size || 20}px;
`