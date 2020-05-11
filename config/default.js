const path = require('path')

module.exports = {
  app: {
    port: "10080",
  },
  mongodb: {
    url: "mongodb://localhost:27017/example",
    options: {},
  },
  baseDir: path.resolve(__dirname, '../temp')
};
