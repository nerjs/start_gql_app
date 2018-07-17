import ResErr, {
	USER_IS_AUTH
} from 'errors'

export default type => async (resolve, parent, args, context, info) => {
	if (context.sess && context.sess.id) {
		return {
			status: false,
			error: new ResErr(type, USER_IS_AUTH)
		}
	}

	return await resolve(parent, args, context, info)
}
