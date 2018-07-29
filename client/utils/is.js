import isPlainObject from 'lodash/isPlainObject'


export const isNumber = num => !isNaN(Number(num))

export const isString = str => typeof str === 'string'

export const isObject = obj => isPlainObject(obj)