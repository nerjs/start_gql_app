import React from 'react'
import { ThemeProvider } from 'styled-components'

import breakpoints from './breakpoints'

const themeSchema = {
	bla : 1,
	breakpoints
}

class CoreThemeProvider extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			width: document.body.clientWidth
		}
	}
	
	componentDidMount() {
		window.addEventListener('resize',(e) => {
		  this.setState({
		  	width: document.body.clientWidth
		  })
		});
	}
	render() {
		const theme = {
			...themeSchema,
			width: this.state.width
		}
		return (
			<ThemeProvider theme={theme}>
				{this.props.children}
			</ThemeProvider>
		)
	}
}


export default CoreThemeProvider