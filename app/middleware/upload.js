'use strict';

const multer = require('koa-multer')
const fs = require('fs-extra')
const moment = require('moment')
const config = require('../../config')

const UPLOAD_DIR = `${config.baseDir}/upload`;

fs.ensureDirSync(UPLOAD_DIR);

module.exports = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, callback) => {
      callback(null, `${moment().format('YYYYMMDDmmssSSS')}-${file.originalname}`)
      console.log(file);

    }
  })
})
