import React from 'react'

import DataProvider from './data'

import Pages from './pages'

export default () => (
	<DataProvider>
		<Pages/>
	</DataProvider>
)