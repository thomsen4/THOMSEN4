var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 5000,
    },

    test: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 4000,
    },

    production: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 80,
    }
};

module.exports = config[env];
