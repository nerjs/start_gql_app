import React from 'react'


import { GroupInput, PasswordWrapper } from 'styled/forms'
import { EyeOpen, EyeClose } from 'styled/icons'

export const TextInput = ({
	field,
	form,
	error,
	...rest
}) => (
	<GroupInput id={`_${field.name}`} 
					{...field} 
					{...rest}
					error={!!error} />
)

export class PasswordInput extends React.Component {
	state = {
		visible : false
	}

	toggleVisible = () => this.setState({ visible: !this.state.visible })

	render() {
		const ToggleButton = this.state.visible ? EyeOpen : EyeClose;
		return (
			<PasswordWrapper>
				<TextInput {...this.props} type={this.state.visible ? 'text' : 'password'} />
				<ToggleButton size={30} onClick={this.toggleVisible} />
			</PasswordWrapper>
		)
	}
}

