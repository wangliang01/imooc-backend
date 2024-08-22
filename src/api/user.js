import User from '../model/user'
import SignRecord from '../model/sign-record'
import { HttpException } from '../utils/httpException'
import { success } from '../utils/helper'
import dayjs from 'dayjs'
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
}

export default new UserController()
