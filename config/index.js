"use strict";

const env = process.env.NODE_ENV;
const defaultConfig = require("./default");
const ALLOWED_ENV = [
    "dev", // 本地开发环境
    "sit", // 测试环境
    "uat", // uat 环境
    "prod", // 生产环境
];

let config;
if (ALLOWED_ENV.includes(env)) {
    config = require(`./${env}`);
}

config = {
    get env() {
        return env;
    },
    get isUnitTest() {
        return env === "jest";
    },
    get isDev() {
        return env === "local";
    },
    get isSit() {
        return env === "sit";
    },
    get isUat() {
        return env === "uat";
    },
    get isProduction() {
        return env === "prod";
    },
    ...defaultConfig,
    ...config,
};

console.log("Current NODE_ENV:", env);
console.log("config:", config);

module.exports = config;
