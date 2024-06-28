import { HttpException } from "../utils/httpException"
class UserController {
  constructor() {}
  async login(ctx) {

  }
  async index(ctx) {
    // throw new HttpException('参数错误', 10000, 400)
    ctx.body = {
      name: 'user',
      path: '/user',
      meta: {
        title: '用户中心!!!!!'
      }
    }
  }
}

export default new UserController()