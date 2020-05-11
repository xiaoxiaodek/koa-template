"use strict";

module.exports = async (ctx, next) => {
  let res;
  let err;
  try {
    res = await next();
  } catch (error) {
    err = error;
    console.error(err)
  }
  console.log("res", res);

  // 已经发送响应
  if (ctx.headerSent) {
    return;
  }

  if (err) {
    if (err.expose) {
      ctx.status = err.status
      return
    }
    ctx.body = {
      code: err.code || 500,
      msg: err.msg || err.message || "服务错误",
    };
    return
  }

  // 没有匹配路由
  if (!ctx._matchedRoute) {
    return;
  }

  if (!ctx.body && ctx.body !== null && ctx.body !== 0) {
    ctx.body = {
      code: 200,
      msg: "success",
      data: res,
    };
    return;
  }
};
