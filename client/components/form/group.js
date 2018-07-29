import React from 'react'

import {
	LayerGroup,
	GroupLabel,
	GroupHelperText,
	GroupInput,
	Label
} from 'styled/forms'

import {
	Row, Col
} from 'styled/grid'

export const TextGroup = ({
	field,
	required,
	error
}) => (
	<GroupInput id={`_${field.name}`} 
					{...field} 
					error={!!error} />
)

console.log(process.env)
const getInput = props => {


	return <TextGroup {...props} type="text"/>
}

const InputGroup = props => (
	<LayerGroup>
		<GroupLabel htmlFor={`_${props.field.name}`} 
			required={props.required} 
			error={!!props.error} >{props.label}</GroupLabel>
		{getInput(props)}
		<GroupHelperText error={!!props.error}>{props.helperText || props.error}</GroupHelperText>
	</LayerGroup>
)


export default InputGroup