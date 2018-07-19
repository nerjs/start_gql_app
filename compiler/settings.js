const path = require('path');


exports.from = path.join(__dirname, '../client')
exports.to = path.join(__dirname, '../file_server/files')

exports.globalName = '__GLOBAL__'
exports.globals = ['redux']

