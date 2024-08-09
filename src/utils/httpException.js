export class HttpException extends Error {
  constructor(msg = '参数错误', errorCode = 10000, code = 400) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
  }
}
