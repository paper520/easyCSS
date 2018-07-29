'use strict';

var source = [
    './src/core.css',//核心
    './src/normalize.css',//浏览器样式统一
    './src/reset.css'//浏览器样式重置
];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并代码
            options: {
                separator: '\n',
                stripBanners: true,
                banner: ''
            },
            target: {
                src: source,
                dest: 'build/easycss-<%= pkg.version %>.css'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            target: {
                src: 'build/easycss-<%= pkg.version %>.css',
                dest: 'build/easycss.postcss-<%= pkg.version %>.css'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslint'
            },
            target: source

        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            target: {
                files: {
                    'build/easycss-<%= pkg.version %>.min.css': ['build/easycss.postcss-<%= pkg.version %>.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('release', ['concat:target', 'postcss:target', 'cssmin:target', 'csslint:target']);
};
