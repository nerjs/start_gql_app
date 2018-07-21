const Static = require('node-static');
const path = require('path')
const opn = require('opn');
require('dotenv').config()
//
// Create a node-static server instance to serve the './public' folder
//
var file = new Static.Server(path.join(__dirname,'files'));

const send500 = res => {
	res.statusCode = 500;
	res.end('Server Error')
}

require('http').createServer(function (request, response) {
	console.log(request.url)
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response).on('error',err => {
        	if (err.status == 404) {
        		file.serveFile('/index.html', 200, {}, request, response);
        		// })
        	} else {
        		send500(response)
        	}
        });
    }).resume();

}).listen(process.env.CLIENT_PORT, process.env.CLIENT_HOST, err => {
	if (err) return console.error(err);
	console.log('File-server Start!, ' + 'http://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT)
    opn('http://' + process.env.CLIENT_HOST + ':' + process.env.CLIENT_PORT);
});