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
                        replacement: '"css/styles<%= pkg.version %>.css"'
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
                    'assets/compiled/style<%= pkg.version %>.css': 'assets/scss/styles.scss'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass:dist']
            },
            www: {
                files: ['assets/compiled/*.css']
            }
        },
        clean: ["assets/compiled/*.css", "assets/compiled/*.css.map"]
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('local', ['watch']);
    grunt.registerTask('deploy', ['clean','bumpup', 'sass', 'string-replace']);
};