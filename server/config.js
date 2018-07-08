import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

require.extensions['.gql'] = function(module, path) {
	const file = fs.readFileSync(path, {
		encoding: 'utf8'
	})
	module.exports = file;
	return 1
}

export default dotenv