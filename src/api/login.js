import { LoginValidator } from '@/validator/index'
import { getValue } from '../utils/redis'
import { HttpException } from '../utils/httpException'
import jwt from 'jsonwebtoken'
import { success } from '../utils/helper'
import User from '../model/user'
import bcrypt from 'bcryptjs'
class LoginController {
  async register(ctx) {
    const params = await new LoginValidator(ctx).validate()
    // 1. 验证码校验
    const code = await getValue(params.sid)
    if (code !== params.code) {
      throw new HttpException('验证码错误', 10001)
    }
    // 2. 检测用户名是否存在
    const user = await User.findOne({
      username: params.username
    })

    if (user) {
      throw new HttpException('用户已存在', 10002)
    }

    // 3. 检测昵称是否存在
    const user1 = await User.findOne({
      nickname: params.nickname
    })

    if (user1) {
      throw new HttpException('昵称已存在', 10003)
    }

    // 密码加密，采用 bcryptjs
    const salt = bcrypt.genSaltSync(10)
    const pwd = bcrypt.hashSync(params.password, salt)

    await User.create({
      username: params.username,
      password: pwd,
      nickname: params.nickname
    })

    success(ctx, null, '注册成功')
  }
  async login(ctx) {
    const params = await new LoginValidator(ctx).validate()
    // 1. 验证码校验
    const code = await getValue(params.sid)
    if (code.toLowerCase() !== params.code.toLowerCase()) {
      throw new HttpException('验证码错误')
    }
    // 2. 账号密码校验
    const user = await User.findOne({
      username: params.username
    })

    // 用户不存在
    if (!user) {
      throw new HttpException('账号或者密码错误')
    }

    // 密码校验
    if (!user.checkPassword(params.password)) {
      throw new HttpException('账号或者密码错误')
    }

    // 3. 返回token
    const token = jwt.sign(
      {
        uid: 1
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    success(ctx, {
      token
    })
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

export default new LoginController()
