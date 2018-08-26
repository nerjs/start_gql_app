import React from 'react';
import { BrowserRouter } from 'react-router-dom'


import { ThemeProvider } from 'styled/settings'
import { Provider as CurrentUserProvider } from 'hocs/cu'
import GqlProvider from './gql_core'
import { Provider as SendProvider } from 'utils/send'

const DataProvider = ({ children }) => (
	<BrowserRouter>
		<GqlProvider>
			<ThemeProvider>
				<SendProvider>
					<CurrentUserProvider>
						{children}
					</CurrentUserProvider>
				</SendProvider>
			</ThemeProvider>
		</GqlProvider>
	</BrowserRouter>
)


export default DataProvider
