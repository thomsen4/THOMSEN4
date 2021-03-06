var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 5000,
        db: 'mongodb://127.0.0.1/helpMe-dev',
        secret: 'DasIstWirklichEinTollerKurs',
        uploads: './public/uploadedFiles'
    },

    test: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 4000,
        db: 'mongodb://127.0.0.1/helpMe-test',
        secret: 'Testgeheimnis',
        uploads: './public/uploadedFiles'
    },

    production: {
        root: rootPath,
        app: { name: 'THOMSEN4' },
        port: 80,
        db: 'mongodb://127.0.0.1/helpMe',
        secret: 'JetztIstsSoweit',
        uploads: './public/uploadedFiles'
    }
};

module.exports = config[env];
