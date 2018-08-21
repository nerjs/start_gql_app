import React from 'react'

import {
	IconLoadSpin
} from 'styled/icons'

const SpinLoader = ({
	active
}) => active ? <IconLoadSpin z={2} size={20} /> : null


export default SpinLoader