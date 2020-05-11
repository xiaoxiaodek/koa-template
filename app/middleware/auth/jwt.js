'use strict';

const jwt = require('jsonwebtoken')
const { CustomError, errorEnums} = require('../../utility/error')

const tempSecret = 'example secret'
// 两分钟过期 刷新token
const refreshTokenTime = 5 * 60 * 1000
const defaultTTL = '1d'


function auth(ctx, next) {
  let token = ctx.get('authorization')
  console.log(token, 'token');

  if (!token || token.length < 8) {
    ctx.throw(401, 'unauthorized')
  }
  console.log(token, 'before');
  
  token = token.slice(7)
  console.log(token, 'sssssssss');
  let validate
  try {
    validate = jwt.verify(token, tempSecret)
    if (!validate) {
      ctx.throw(401, 'unauthorized')
    }
    if (validate.user) {
      throw new CustomError(errorEnums.Unauthorized)
    }
    if (Date.now() - validate.exp < refreshTokenTime) {
      // TODO: refresh token
    }
  } catch (e) {
    console.log(`jwt.verify error: ${e.message}, authorization: ${token}`);
    throw new CustomError(errorEnums.Unauthorized, {subError: {msg: e.message}})
  }
  next()
}

function generateToken(username) {
  const token = jwt.sign({ user: { username }}, tempSecret, {expiresIn: defaultTTL})
  return token
}

function refreshToken() {

}

module.exports = {
  auth,
  generateToken,
  refreshToken,
}