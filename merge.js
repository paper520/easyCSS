/**
 * 用来负责合并代码的脚本
 */

const fs = require("fs");
const path = require('path');

console.log('\x1B[37m%s\x1B[39m', new Date() + ':代码合并开始\n');

// [读取核心代码]
let content = fs.readFileSync(path.join('./src', 'core.css'), 'utf-8');
fs.writeFile('./easycss-1.0.0.css', "/*!\n* [" + new Date() + "]\n*/\n" + content, { encoding: 'utf-8' }, function () {
    console.log('\x1B[37m%s\x1B[39m', new Date() + ':核心代码合并成功\n');

    //[读取完成特定功能的模块]
    let files = [

        // 浏览器样式统一
        'normalize.css',

        // 浏览器样式重置
        'reset.css',

        // 十二栅格化
        'rasterize.css'

    ];

    // 迭代目录下的每一个文件
    files.forEach(function (filename) {
        var filedir = path.join('./src', filename);
        // 读取文件内容
        let content = fs.readFileSync(path.join('./src', filename), 'utf-8');
        // 读取的内容拼接到最终的文件中
        fs.appendFile('./easycss-1.0.0.css', "\n/*!======= " + filename + " =======*/\n" + content, function () {
            console.log('\x1B[37m%s\x1B[39m', new Date() + ':' + filename + '合并成功\n');
        });
    });

});

