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


import {
	TextInput,
	PasswordInput
} from './input'



class InputGroup extends React.Component {
	getInput = () => {
		const { type } = this.props
		switch (type) {
			case 'password': return <PasswordInput {...this.props} error={this.error} />;
			default: return <TextInput {...this.props} type="text" error={this.error} />
		}
	}

	getError = () => {
		const { touched, errors, values } = this.props.form
		const { name } = this.props.field

		this.error = touched[name] && errors[name] ? errors[name] : null
	}

	render() {
		this.getError()
		const { helperText, required, label } = this.props;
		const { name } = this.props.field;
		const error = this.error
		return (
			<LayerGroup>
				<GroupLabel htmlFor={`_${name}`} 
					required={!!required} 
					error={!!error} >{label}</GroupLabel>
				{this.getInput()}
				<GroupHelperText error={!!error}>
					{error || helperText}
				</GroupHelperText>
			</LayerGroup>
		)
	}
}




export default InputGroup