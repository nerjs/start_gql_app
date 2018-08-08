import React from 'react'


import { GroupButtonSubmit } from 'styled/forms'
import { SimpleTitle } from 'styled/typo'

import withCu from 'hocs/cu'

const AuthLogout = ({
	removeUser
}) => (
	<React.Fragment>
		<SimpleTitle>Logout</SimpleTitle>
		<GroupButtonSubmit onClick={()=>removeUser()}>logout</GroupButtonSubmit>
	</React.Fragment>
)

export default withCu(AuthLogout)