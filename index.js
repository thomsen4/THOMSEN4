var express = require('express');
var config = require('./config/config');
var app = express();
require('./config/express')(app, config.port);
require('http').createServer(app).listen(port, function () {
console.log("HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});
