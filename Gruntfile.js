module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        cssmin: {
            all: {
                files: {
                    'assets/css/style.min.css': ['assets/css/style.css','assets/css/syntax.css']
                }
            }
        },
        jshint: {
            all: ['assets/js/app.js', '!assets/js/app.min.js']
        },
        uglify: {
            all: {
                files: {
                    'assets/js/jquery.plugins.min.js': ['assets/js/jquery.*.js'],
                    'assets/js/app.min.js': ['assets/js/app.js']
                }
            }
        },
        watch: {
            css: {
                files: ['assets/css/style.min.css'],
                tasks: ['cssmin'],
                options: {span: false}
            },
            js: {
                files: ['assets/js/*.js', '!assets/js/app.min.js'],
                tasks: ['jshint', 'uglify'],
                options: {span: false}
            }
        }
    });

    grunt.registerTask('default', ['cssmin', 'jshint', 'uglify']);
};
