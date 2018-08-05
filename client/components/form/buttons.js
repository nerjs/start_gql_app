import React from 'react'

import { GroupButtonSubmit } from 'styled/forms'
import { Span } from 'styled/typo'

import { ButtonLoader } from 'comp/loader'


export const OnceButton = ({
	label,
	load,
	disabled
}) => (
	<GroupButtonSubmit type="submit" 
						disabled={!!disabled} 
						load={!!load} >
		<Span>
			{label}
		</Span>
		<ButtonLoader active={!!load}/>
	</GroupButtonSubmit>
)