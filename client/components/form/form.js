import React from 'react'


import { Form } from 'styled/forms'


class FormContainer extends React.Component {

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.props.onSubmit) {
			
		}
	}

	render() {

		return (
			<Form >
				{this.props.children}
			</Form>
		)
	}
}

export default FormContainer