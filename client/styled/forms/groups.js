import React from 'react'
import styled, { css } from 'styled-components'

import { Row, Col } from '../grid'
import { Input, Label } from './forms_core'
import { HelperText, Span,  } from '../typo'
import { Button } from '../buttons'
import { clearDiv } from '../helpers'


export const LayerGroup = styled.div`
	width: 100%;
	position: relative;
	padding: 2px 4px;
	margin: 2px 0 5px;
	overflow: hidden;
`
export const GroupLabel = styled(Label)`
	display: block;
	font-size: 13px;
	color: inherit;
	font-weight: bold;
	width: 100%;
	padding: 2px 10px;
	${({ required }) => !required ? null : css`
		&:after {
			content: "*";
		}
	`}

	${({ theme: {colors}, error })=> error ? css`color:${colors.formError};` : ''}
`

export const GroupInput = styled(Input)`
	width:100%;
	color: rgba(0,0,0,.6);
	box-shadow: 0 0 5px ${({ theme : { colors } , error }) => error ? colors.formError : colors.formInput};
	transition: 0.2s;

	&:focus {
		color: #000;
		box-shadow: 0 0 10px ${({ theme : { colors } , error }) => error ? colors.formError : colors.formInput};
	}
`

export const GroupHelperText = styled(HelperText)`
	left: 10px;
	${({ theme: {colors}, error })=> error ? css`color:${colors.formError}` : ''}
`

export const GroupButtonSubmit = styled(Button)`
	width: 100%;
	padding: 8px 10px;
	font-size: 18px;

	& span {
		width: 100%;
		text-align: center;
		z-index: 1;
		opacity: 1;
	}

	&:disabled {
		cursor: default;

		& span {
			opacity: 0.3;
		}
	}


	@media (min-width: ${props => props.theme.bp.sm}px) {
		margin-left: 50%;
		transform: translate(-50%, 0);
		width: 300px;
		font-size: 15px;
	}


	@media (min-width: ${props => props.theme.bp.md}px) {
		padding: 4px 10px;
	}
`

export const PasswordWrapper = styled(clearDiv)`
	position: relative;
`
