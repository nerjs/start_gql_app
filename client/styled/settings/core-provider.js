import React from 'react'
import { ThemeProvider } from 'styled-components'

import breakpoints from './breakpoints'

const theme = {
	bla : 1,
	breakpoints
}

const CoreThemeProvider = (props) => {
	return (
		<ThemeProvider theme={props.theme || theme}>
			{props.children}
		</ThemeProvider>
	)
}


export default CoreThemeProvider