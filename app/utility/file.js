'use strict';

const fs = require('fs')
const path = require('path')

function getFileNameRecursive(filepath, res = []) {
    if (getType(filepath) !== 'String') {
        throw new Error('filepath should be string')
    }
    if (!path.isAbsolute(filepath)) {
        throw new Error(`filepath should be abosolute`)
    }
    const dirents = fs.readdirSync(filepath, {withFileTypes: true})
    for (let item of dirents) {
        const currentPath = path.join(filepath, item.name)
        if (item.isDirectory()) {
            getFileNameRecursive(currentPath, res)
        } else {
            res.push(currentPath)
        }
    }
    return res
}

function getType (val) {
    return Object.prototype.toString.call(val).slice(8, -1)
}

module.exports = {
    getType,
    getFileNameRecursive,
}