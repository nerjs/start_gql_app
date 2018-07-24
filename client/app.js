import React from 'react'

import { ThemeProvider } from 'styled/settings'

import Demo from 'comp/styled-demo'

export default () => (
	<ThemeProvider>
		<Demo />
	</ThemeProvider>
)