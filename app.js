'use strict';

const Koa = require("koa");
const http = require("http");
const path = require("path");

const koaMulter = require("koa-multer");
const bodyParser = require("koa-bodyparser");

const router = require("./app/router");
const config = require("./config");
const render = require("./app/middleware/render");
const responseHandle = require("./app/middleware/response-handle");
const { auth } = require('./app/middleware/auth/jwt')
const MongoClient = require("./app/database/mongodb/index");

const initBeforeStart = async function () {
  // 数据库链接
  await MongoClient.init(config.mongodb.url, config.mongodb.options);
};

const startApp = async function () {
  const app = new Koa();
  const server = http.createServer(app.callback());

  // 中间件

  app.use(bodyParser());

  // 返回结果处理
  app.use(responseHandle);

  // context 增加 render方法
  render(app);

  // app.use(koaMulter());
  app.use(auth)
  app.use(router.routes());
  app.use(router.allowedMethods());

  // init
  await initBeforeStart();

  server.listen(config.app.port);
  console.log(`service start at ${config.app.port}`);
  process.on('unhandledRejection', (err) => {
    console.log(err)
  })
};

startApp();
