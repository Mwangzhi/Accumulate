#! /usr/bin/env node

// 1 找到当期执行命令的路径,

let path = require('path');

let config = require(path.resolve('webpack.config.js'));

let Compolier = require('../lib/Compolier')
let compiler = new Compolier(config)
compiler.hooks.emit.call('emit');
compiler.run();


