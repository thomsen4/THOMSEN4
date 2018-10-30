module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        nodemon: {
            dev: { script: 'index.js' }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-nodemon');

    grunt.registerTask('default', [
        'nodemon'
    ]);
};
