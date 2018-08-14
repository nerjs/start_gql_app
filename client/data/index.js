import React from 'react';
import { BrowserRouter } from 'react-router-dom'


import { ThemeProvider } from 'styled/settings'
import { Provider as CurrentUserProvider } from 'hocs/cu'
import GqlProvider from './gql_core'

const DataProvider = ({ children }) => (
	<BrowserRouter>
		<GqlProvider>
			<ThemeProvider>
				<CurrentUserProvider>
					{children}
				</CurrentUserProvider>
			</ThemeProvider>
		</GqlProvider>
	</BrowserRouter>
)


export default DataProvider
