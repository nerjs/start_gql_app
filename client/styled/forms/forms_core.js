import styled from 'styled-components'

export const Form = styled.form`
	display: block;
`

export const Input = styled.input`
	display: inline-block;
	background-color: #fff;
	color: #000;
	font-size: 16px;
	min-height: 40px;
	line-height: 40px;
	padding: 2px 6px;
	border-radius: 5px;
	box-shadow: 0 0 5px ${({ theme : { colors } , error }) => error ? colors.formError : colors.formInput};
	transition: 0.2s;

	&:focus {
		box-shadow: 0 0 10px ${({ theme : { colors } , error }) => error ? colors.formError : colors.formInput};
	}

	@media (min-width: ${({ theme: { bp }})=>bp.md}px) {
		font-size: 15px;
		min-height: 32px;
		line-height: 32px;
		padding: 2px 8px;
	}
`

export const Label = styled.label`
	display: inline-block;
	background: rgba(220,220,220,.6);
	color: rgba(0,0,0,.7);
	font-size: 14px;
	color: ${({ theme : { colors } , error }) => error ? colors.formError : colors.formLabel};
`

export const TextArea = styled.textarea`
	background: #fff;
	color: rgba(0,100,0,.7);	
`

export const Select = styled.select`
	border: 1px solid orange;
`

export const Option = styled.option`
	font-size: 12px;
	color: green;
`