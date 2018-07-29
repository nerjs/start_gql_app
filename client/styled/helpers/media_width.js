import styled, { css } from 'styled-components'

import { isNumber, isString, isObject } from 'utils/is'

const parseWidth = sp => {
	if (isString(sp)) return css`width:${sp};`;
	if (isNumber(sp)) return css`width:${sp}px;`;
	if (isObject(sp) && sp.width) return parseWidth(sp.width);
	return ''
}


export const schemaWidth = schema => ({
	theme : { breakpoints }
}) => {
	if (!schema || !isObject(schema)) return '';
	const result = Object.keys(breakpoints)
						.filter(key => !!schema[key])
						.map(key => {
							let rule = css`
								${parseWidth(schema[key])}
							`
							if (key == 'xs') return rule;
							return css`
								@media (min-width: ${breakpoints[key]}px) {
									${rule}
								}
							`
						})
	return css`${result}`
}


