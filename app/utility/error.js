"use strict";

const BaseError = {
  Unauthorized: {
    code: 1004,
    msg: "鉴权错误，toke不合法",
    name: "Unauthorized",
  },
  TokenExpire: {
    code: 1005,
    msg: "鉴权错误，token过期",
    name: "TokenExpire",
  },
  TopClientError: {
    code: 1000,
    msg: "调用淘宝接口失败",
    name: "TopClientError",
  },
  ParamsError: {
    code: 1003,
    msg: "请求参数错误",
    name: "TopClientError",
  },
};

const DatabaseError = {
  ProductNotExists: {
    code: 1001,
    msg: "商品不存在",
    name: "ProductNotExists",
  },
  ProductNotShelf: {
    code: 1002,
    msg: "商品未上架",
    name: "ProductNotExists",
  },
};
const errorEnums = {
  ...BaseError,
  ...DatabaseError,
};

class CustomError extends Error {
  constructor({ code, msg, name }, options) {
    if (options && options.subError) {
      msg = `${msg}\n${options.subError.msg}`;
    }
    super(msg);
    this.msg = msg;
    this.code = code;
    this.name = name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  CustomError,
  errorEnums,
};
