const { execFileSync } = require('child_process')

const encode = str => (new TextDecoder("utf-8").decode(execFileSync('../cipher/cipher', ['encode', str]))).trim();
const decode = str => (new TextDecoder("utf-8").decode(execFileSync('../cipher/cipher', ['decode', str]))).trim();

module.exports = {
  encode: str => encode(str),
  decode: str => decode(str),
};
