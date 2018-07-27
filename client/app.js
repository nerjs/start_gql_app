import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled/settings'

import Pages from './pages'

export default () => (
	<BrowserRouter>
		<ThemeProvider>
			<Pages />
		</ThemeProvider>
	</BrowserRouter>
)