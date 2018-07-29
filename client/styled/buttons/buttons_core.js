import styled from 'styled-components'


export const Button = styled.button`
	display: inline-block;
	background-color: ${({ theme : { colors }}) => colors.buttonPrimaryBg};
	color: ${({ theme : { colors }}) => colors.buttonPrimary};
	font-size: 16px;
	padding: 2px 5px;
	border-radius: 3px;
	cursor: pointer;
	text-align: center;
	box-shadow: 0 0 4px #000, inset 0 0 3px #fff;
	transition: .1s;

	&:hover {
		box-shadow: 0 0 4px #000, inset 0 0 4px #fff;
	}

	&:focus {
		box-shadow: 0 0 2px #000, inset 0 0 2px #fff;
	}
`