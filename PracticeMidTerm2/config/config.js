var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'THOMSEN4-PM2' },
        port: 5001,
        db: 'mongodb://127.0.0.1/grades-dev',
    },
};

module.exports = config[env];
