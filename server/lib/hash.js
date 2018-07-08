
import crypto from 'crypto'


const {
	CRYPTO_HASH_SALT
} = process.env

export const getHash = str => crypto.createHash('md5').update(`_${str}_${CRYPTO_HASH_SALT}`).digest('hex')

export const isHash = (val, hash) => (getHash(val) === hash)