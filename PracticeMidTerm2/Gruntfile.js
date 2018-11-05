module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        env: {
            dev: {
                NODE_ENV: 'development'
            },
        },

        nodemon: {
            dev: { script: 'index.js' }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');

    grunt.registerTask('default', [
        'nodemon'
    ]);
};
