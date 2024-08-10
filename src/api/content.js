import Post from '../model/post'
import { success } from '../utils/helper'
import { ContentValidator } from '../validator'
class ContentController {
  async getPostList(ctx) {
    // 创建测试数据
    // await Post.create({
    //   title: '重老集都本',
    //   content: '处受构前整们但才必对图建。织关里整将下种派量切能段史思车。九观参定次中小六消术达九八少公。',
    //   created: '2024-08-10 13:48:19',
    //   category: 'ask',
    //   fav: '16',
    //   isEnd: '1',
    //   readNum: 365,
    //   answerNum: 5,
    //   status: '0',
    //   isTop: '0',
    //   sort: '7',
    //   tags: [
    //     {
    //       name: '加精',
    //       class: 'layui-bg-blue'
    //     },
    //     {
    //       name: '精华',
    //       class: 'layui-bg-blue'
    //     },
    //     {
    //       name: '加精',
    //       class: 'layui-bg-red'
    //     }
    //   ]
    // })
    const v = await new ContentValidator(ctx).validate()

    const { type: isTop, tag, page = 1, size = 10, sort = 'created', ...option } = v
    option.isTop = isTop
    if (tag) {
      option.tags = { $elemMatch: { name: tag } }
    }
    const result = await Post.getList(option, page, size, sort)
    success(ctx, result)
  }
}

export default new ContentController()
