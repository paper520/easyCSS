'use strict';

var banner = '/*!\n' +
    '*\n' +
    '* easyCSS - A lightweight style library that helps quickly use CSS.\n' +
    '* https://github.com/yelloxing/easyCSS\n' +
    '* \n' +
    '* author <%= pkg.author %>\n' +
    '*\n' +
    '* version <%= pkg.version %>\n' +
    '* \n' +
    '* build 2018/02/24\n' +
    '*\n' +
    '* Copyright yelloxing\n' +
    '* Released under the MIT license\n' +
    '* \n' +
    '**************************************************************\n' +
    '* \n' +
    '*【内容】\n' +
    '*\n' +
    '* 1.不同浏览器样式统一 \n' +
    '*\n' +
    '* 2.浏览器默认样式优化 \n' +
    '*\n' +
    '* 3.预定义特殊布局样式 \n' +
    '*\n' +
    '* 【说明】\n' +
    '*\n' +
    '* 细节方面的说明直接在代码中备注，并且此处维护的不是针对全部的css样式和html元素的设计，只是针对常用的，目标是轻量级。\n' +
    '*\n' +
    '*/';

var source = [
    './build/style.css'
];

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并代码
            options: {
                separator: '\n',
                stripBanners: true,
                banner: banner
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
