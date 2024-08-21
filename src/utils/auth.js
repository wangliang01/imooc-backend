import jwt from 'jsonwebtoken'
import { HttpException } from './httpException'
class Auth {
  get m() {
    return (ctx) => {
      const token = ctx.header.authorization
      if (!token) {
        throw new HttpException('请先登录', 10001)
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        ctx.auth = decoded
      } catch (error) {
        // token 过期
        if (error.name === 'TokenExpiredError') {
          throw new HttpException('token已过期', 10001)
        }
        throw new HttpException('无效token', 10001)
      }
    }
  }
}

export default Auth
