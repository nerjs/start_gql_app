import mongoose from 'mongoose'


import Logger from 'log'
import ResErr, {
	BAD_QUERY,
	NOT_FOUND
} from 'errors'
import { def as defAvatar } from './avatar'

const { ObjectId } = mongoose.Types
const { NODE_ENV } = process.env

const log = Logger('db:class')



class DefDbClass {

	static getId(_id) {
		let id;
		try {
			id = new ObjectId(_id)
		} catch(e) {
			return Promise.reject(new ResErr(`ID_${this.collection.collectionName}`,BAD_QUERY))
		}
		return Promise.resolve(id);
	}

	static async getById(_id) {
		let id = await this.getId(_id);
		return await this.findById(id)
	}

	static async updateById(_id, args) {
		let coll;

		if (!args || typeof args != 'object' || Object.keys(args).length === 0) throw new ResErr('user',BAD_QUERY);

		const id = await this.getId(_id);

		try {
			coll = await this.findByIdAndUpdate(id, args)
		} catch (e) {
			throw new ResErr('user',DB_ERROR,e)
		}

		if (!coll) throw new ResErr('user',NOT_FOUND)


		Object.keys(args).forEach( key => {
			coll[key] = args[key]
		})

		return coll
	}

}





export default DefDbClass