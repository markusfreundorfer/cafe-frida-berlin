module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            file: 'package.json'
        },
        'string-replace': {
            inline: {
                files: {
                    'index.html': 'index.html',
                },
                options: {
                    replacements: [{
                        pattern: /\"[^\s]+[.]css\"/,
                        replacement: '"assets/compiled/styles<%= pkg.version %>.css"'
                    }]
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    'assets/compiled/styles<%= pkg.version %>.css': 'assets/scss/styles.scss'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'assets/js/**/*.js',
                dest: 'assets/compiled/magic.min.js'
            }
        },
        gitadd: {
            task: {
                options: {
                    force: true
                },
                files: {
                    src: ['assets/compiled/*']
                }
            }
        },
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass:dist']
            },
            js:{
                files: ['assets/js/**/*.js'],
                tasks: ['uglify']
            },
            www: {
                files: ['assets/compiled/*.css']
            }
        },
        clean: ["assets/compiled/*.css", "assets/compiled/*.css.map", "assets/compiled/*.js"]
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('local', ['sass','watch']);
    grunt.registerTask('deploy', ['clean','bumpup', 'uglify', 'sass', 'string-replace']);
};