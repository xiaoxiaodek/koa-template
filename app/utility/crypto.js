'use strict';
const crypto = require('crypto')

const password = 'useyourownpassword'
const salt = 'yoursalt'
const algorithm = 'aes-192-cbc'
const passphrase = 'useyourownpassword'

const generateRsaKeypair = function() {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // 指定秘钥长度
    publicKeyEncoding: {
      type: 'spki', // 公钥编码格式
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8', // 私钥编码格式
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase,
    },
  })
}

const MD5 = function (string) {
  return crypto.createHash('md5').update(string).digest('hex')
}

const symmetricEncrypt = function (string, password, salt) {
  const iv = Buffer.alloc(16, 0)
  const key = crypto.scryptSync(password, salt, 24)
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let res = cipher.update(string, 'utf8', 'hex');
  res += cipher.final('hex');
  return res
}

const symmetricDecrypt = function (encrypedString, password, salt) {
  const iv = Buffer.alloc(16, 0)
  const key = crypto.scryptSync(password, salt, 24)
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let res = decipher.update(encrypedString, 'hex', 'utf8');
  res += decipher.final('utf8');
  return res
}

const asymmetricEncrypt = function (string, publicKey) {
  return crypto.publicEncrypt({key: publicKey}, Buffer.from(string)).toString('hex')
}

const asymmetricDecrypt = function (encrypedString, privateKey, passphrase) {
  return crypto.privateDecrypt({key: privateKey, passphrase}, Buffer.from(encrypedString, 'hex')).toString('utf8')
}

module.exports = {
  MD5,
  symmetricEncrypt,
  symmetricDecrypt,
  asymmetricEncrypt,
  asymmetricDecrypt,
  generateRsaKeypair
}