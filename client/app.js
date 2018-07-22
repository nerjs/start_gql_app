import React from 'react'
import { H1 } from 'styled/h'
import  './test.css'


class Form extends React.Component {
	constructor(props) {
		super(props)
		this.txt = 'extends'
		this.state = {
			value: ''
		}
	}

	render() {

		return (
			<div>
			<div>1- {this.txt} - {this.state.value } - {this.props.data} </div>
			<input type="text"
				onChange={(e)=> this.setState({ value: e.target.value })} />
			</div>
		)
	}
}

class Form2 extends Form {
	constructor(props) {
		super(props)
		this.txt = 'form2'
	}
}

class Form3 extends Form {
	constructor(props) {
		super(props)
		this.txt = 'form31'
	}
}

export default () => (
	<div>
		<Form data="first11" />
		<br />
		<Form2 data="second" />
		<br />
		<Form3 data="last" />
	</div>
)