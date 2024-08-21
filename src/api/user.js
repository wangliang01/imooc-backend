import User from '../model/user'
import SignRecord from '../model/sign-record'
import { HttpException } from '../utils/httpException'
import { success } from '../utils/helper'
import dayjs from 'dayjs'
class UserController {
  // 根据连续签到天数规则获取积分
  async getFavs(tount) {
    if (tount < 5) {
      return 5
    }
    if (tount < 15) {
      return 10
    }
    if (tount < 30) {
      return 15
    }
    if (tount < 100) {
      return 20
    }
    if (tount < 365) {
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
      await SignRecord.create({ uid, fav: 5, lastSign: dayjs().format('YYYY-MM-DD HH:mm:ss') })
      return success(ctx, { count: 1, favs: 5 }, '签到成功')
    }

    // 有历史签到数据
    // 判断用户上一次签到记录的created时间是否与今天相同
    // 如果相同，则用户是在连续签到
    if (dayjs(record.created).isSame(dayjs(), 'day')) {
      throw new HttpException('今天已经签到过了')
    }
    // 如果当前时间的日期与用户上一次签到的日期相同，说明用户已经签到
    if (dayjs(record.lastSign).isSame(dayjs(), 'day')) {
      throw new HttpException('今天已经签到过了')
    }

    // 判断连续签到
    if (dayjs(record.lastSign).isSame(dayjs().subtract(1, 'day'), 'day')) {
      // 签到积分规则
    }

    const user = await User.findById(uid)
    const count = user.count
    const favs = this.getFavs(count)
    // 保存用户的签到数据，签到记数 + 积分数据
    await User.updateOne(
      { _id: uid },
      {
        $inc: { count: 1, favs }
      }
    )
  }
}

export default new UserController()
