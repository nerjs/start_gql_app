import ResErr, {
	NOT_AUTHORIZED
} from 'errors'

export default type => async (resolve, parent, args, context, info) => {
	if (!context.sess || !context.sess.id) {
		return {
			status: false,
			error: new ResErr(type, NOT_AUTHORIZED)
		}
	}

	return await resolve(parent, args, context, info)
}
