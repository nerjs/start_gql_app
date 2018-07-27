import { css } from 'styled-components'


export const parseNumber = num => {
	if (!num) return 100;
	const n = Number(num);
	if (isNaN(n)) return 100;
	if (n > 100) return 100;
	if (n < 0) return 0;
	return n;
}



const pm = (name, props) => {
	let ruleV;
	let ruleW;
	let rule = [];
	if (props.visible && props.visible[name] !== undefined) {
		ruleV = props.visible[name] ? css`display:${props.flex ? 'flex;' : 'block;'}` : css`display:none;`
		rule.push(ruleV)
	}
	if (props.pix && props.pix[name] !== undefined) {
		ruleW = css`width:${Number(props.pix[name])}px;`
	} else if (props[name]) {
		ruleW = css`width:${parseNumber(props[name])}%;`
	}

	if (ruleW) rule.push(ruleW)

	if (rule.length == 0) return null;

	return css`${rule}`;
}

export const parseMedia = props => {

	const bp = props.theme.breakpoints

	const result = Object.keys(bp)
					.map(key => ({ key, rule: pm(key, props)}))
					.filter( ({ rule }) => !!rule)
					.map(({ key, rule }) => {
						if (bp[key] == 0) return rule;
						return css`
							@media (min-width: ${bp[key]}px) {
								${rule}
							}
						`
					})

	return css`
		${result}
	`
}