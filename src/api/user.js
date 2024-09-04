import User from '../model/user'
import SignRecord from '../model/sign-record'
import { HttpException } from '../utils/httpException'
import { success } from '../utils/helper'
import dayjs from 'dayjs'
import { UserBasicValidator } from '../validator'
import send from '../service/mail/index'
import { v4 as uuid } from 'uuid'
import { setValue, getValue } from '../utils/redis'
import { generateToken } from '../utils/jwt'
import jwt from 'jsonwebtoken'
class UserController {
  // 根据连续签到天数规则获取积分
  static async getFavs(count) {
    if (count < 5) {
      return 5
    }
    if (count < 15) {
      return 10
    }
    if (count < 30) {
      return 15
    }
    if (count < 100) {
      return 20
    }
    if (count < 365) {
      return 30
    }
    return 50
  }
  // 用户签到
  async userSign(ctx) {
    // 取用户的ID
    const { uid } = ctx.state.user
    // 查询用户上一次签到记录
    const record = await SignRecord.findByUid(uid)

    const user = await User.findById(uid)

    let result = {}

    if (!record) {
      // 无签到数据
      // 保存用户的签到数据，签到记数 + 积分数据
      await User.updateOne(
        { _id: uid },
        {
          $set: { count: 1 },
          $inc: { favs: 5 }
        }
      )
      await SignRecord.create({ uid, favs: user.favs + 5 })
      return success(ctx, { count: 1, favs: user.favs + 5 }, '签到成功')
    }

    // 有历史签到数据
    // 判断用户上一次签到记录的created时间是否与今天相同
    // 如果相同，则用户是在连续签到
    if (dayjs(record.created).isSame(dayjs(), 'day')) {
      throw new HttpException('今天已经签到过了')
    }

    // 判断连续签到
    if (dayjs(record.created).isSame(dayjs().subtract(1, 'day'), 'day')) {
      const favs = await UserController.getFavs(user.count + 1)
      // 签到积分规则
      // 保存用户的签到数据，签到记数 + 积分数据
      await User.updateOne(
        { _id: uid },
        {
          $inc: { count: 1, favs }
        }
      )

      result = { count: user.count + 1, favs: user.favs + favs }
    } else {
      // 用户中断连续签到
      await User.updateOne(
        { _id: uid },
        {
          $set: { count: 1 },
          $inc: { favs: 5 }
        }
      )

      result = { count: 1, favs: user.favs + 5 }
    }
    await SignRecord.create({ uid, ...result })
    return success(ctx, result, '签到成功')
  }
  async updateBasicInfo(ctx) {
    const v = await new UserBasicValidator(ctx).validate()
    console.log('v', v)
    const { uid } = ctx.state.user
    const user = await User.findOne({ _id: uid })
    if (!user) {
      throw new HttpException('用户不存在')
    }
    const tempUser = await User.findOne({ username: v.username })
    if (tempUser) {
      throw new HttpException('该用户名已存在')
    }
    if (v.username !== user.username) {
      const key = uuid()
      setValue(key, generateToken({ uid: user._id }), '30m')
      // 发邮件进行验证
      const result = await send({
        type: 'email',
        data: {
          username: v.username,
          key
        },
        expire: dayjs().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        email: user.username,
        user: v.nickname
      })
      console.log('result', result)
      success(ctx, null, '发送验证邮件成功, 请点击链接修改邮件账号')
    } else {
      await User.updateOne(
        { _id: uid },
        {
          $set: { ...v }
        }
      )
      success(ctx, null, '更新成功')
    }
  }
  async updateUsername(ctx) {
    const body = ctx.query
    if (body.key) {
      const token = await getValue(body.key)
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          const { uid } = decoded
          await User.updateOne({ _id: uid }, { $set: { username: body.username } })
          success(ctx, null, '更新用户名成功')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}

export default new UserController()
