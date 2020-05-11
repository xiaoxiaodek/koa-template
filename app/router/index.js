'use strict';

const path = require('path')
const fsUtil = require('../utility/file.js')
const Router = require('koa-router')
const router = new Router()

const files = fsUtil.getFileNameRecursive(path.join(__dirname, 'group'))

files.forEach((item) => {
    router.use(require(item).routes())
})

module.exports = router