'use strict';

const template = require('art-template')
const fs = require('fs')
const Path = require('path')

module.exports = (app) => {
  app.context.render = async function (filename, data, htmlHandler) {
    const ctx = this;
    console.log(this, 'this');

    let path = filename;
    if (!Path.isAbsolute(filename)) {
      path = Path.resolve(__dirname, '../../view', filename) + '.html';
    }

    const source = await fs.promises.readFile(path, { encoding: 'utf8' });

    const render = template.compile(source, { debug: true });
    let html = render({ ...ctx.state, ...data });
    if (htmlHandler) {
      html = await htmlHandler(html);
    }

    ctx.type = 'html';
    ctx.body = html;
  }
}