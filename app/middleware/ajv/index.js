"use strict";
const Ajv = require("ajv");
const ajv = new Ajv({ coerceTypes: true });

const { CustomError, errorEnums } = require("../../utility/error");

/**
 * @description 根据传入schema返回验证中间件
 * @param {*} schema
 */
function createValidation(schema) {
    return async function (ctx, next) {
        try {
            let data = ctx.req.body || ctx.request.body;
            console.dir(ctx);
            let result = ajv.validate(schema, data);
            if (!result) {
                // throw new Error(`请求参数错误\n${ajv.errorsText()}`);
                throw new CustomError(errorEnums.ParamsError, {
                    subError: { msg: ajv.errorsText() },
                });
            } else {
                await next();
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}

module.exports = createValidation;
