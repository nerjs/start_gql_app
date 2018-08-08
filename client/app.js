import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled/settings'
import { Provider as CurrentUserProvider } from 'hocs/cu'

import Pages from './pages'

export default () => (
	<BrowserRouter>
		<ThemeProvider>
			<CurrentUserProvider>
				<Pages/>
			</CurrentUserProvider>
		</ThemeProvider>
	</BrowserRouter>
)