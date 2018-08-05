import React from 'react'

import {
	IconLoadFixedSpin
} from 'styled/icons'

const ButtonLoader = ({
	active
}) => active ? <IconLoadFixedSpin z={2} size={20} /> : null


export default ButtonLoader