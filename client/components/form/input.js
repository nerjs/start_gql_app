import React from 'react'


export const TextInput = () => (
	'text'
)

export class PasswordInput extends React.Component {
	state = {
		visible : false
	}

	toggleVisible = () => this.setStae({ visible: !this.state.visible })

	render() {

		return 'password'
	}
}

