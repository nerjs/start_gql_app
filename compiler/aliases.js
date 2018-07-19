const path = require('path');
const src = path.join(__dirname, '..','src')
// -- ALIASES ---------------------
module.exports = {
	css    : path.join(src,'css'),
	c      : path.join(src,'components'),
	data   : path.join(src,'data'),
	d   : path.join(src,'data'),
	ctrl   : path.join(src,'controllers'),
	v : path.join(src,'vendor'),
	ico : 'react-icons/lib'
}