import React from 'react'


import { Form } from 'styled/forms'
import {
	GroupHelperText
} from 'styled/forms'


const FormContainer = ({
	onSubmit,
	error,
	children
}) => (
	<Form onSubmit={onSubmit} >
		{!!error && <GroupHelperText error={true}>{error}</GroupHelperText>}
		{children}
	</Form>
)


export default FormContainer