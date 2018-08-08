import React from 'react'

import { getName } from './helper'
import { Consumer } from './context'

class CUConsumerClass extends React.Component {
	consumWrapper = (context={}) => {
		const { Wrapped } = this;
		return <Wrapped {...context} {...this.props} />
	}

	render() {

		return (
			<Consumer>
				{this.consumWrapper}
			</Consumer>
		)
	}
}

const CurrentUserConsumer = Wrapped => (
	class CUW extends CUConsumerClass {
		static displayName = getName(Wrapped);
		constructor(props) {
			super(props);
			this.Wrapped = Wrapped;
		}
	}
)



export default CurrentUserConsumer