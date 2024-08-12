import Link from '../model/links'
import Post from '../model/post'
import { success } from '../utils/helper'
import { ContentValidator } from '../validator'
class ContentController {
  // 文章列表
  async getPostList(ctx) {
    const v = await new ContentValidator(ctx).validate()

    const { type: isTop, tag, page = 1, size = 10, sort = 'created', ...option } = v
    option.isTop = isTop
    if (tag) {
      option.tags = { $elemMatch: { name: tag } }
    }
    // 删除option中的空值
    Object.keys(option).forEach((key) => {
      if (option[key] === undefined || option[key] === '') delete option[key]
    })
    const result = await Post.getList(option, page, size, sort)
    success(ctx, result)
  }
  // 友情链接
  async getLinks(ctx) {
    const result = await Link.find({ type: '1' })
    success(ctx, result)
  }
  // 温馨提示
  async getTips(ctx) {
    const result = await Link.find({ type: '2' })
    success(ctx, result)
  }

  // 本周热议
  async getTopWeek(ctx) {
    const result = await Post.getTopWeek()
    success(ctx, result)
  }
}

export default new ContentController()
