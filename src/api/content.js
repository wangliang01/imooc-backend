// import { success } from '../utils/helper'
// import { ContentValidator } from '../validator'
import Post from '../model/post'

class ContentController {
  async getPostList(ctx) {
    // 测试
    // 先插入几条数据
    const insertData = {
      title: '高争号这千问',
      content:
        '京打话你边已非流面第持地万龙划走第。等党门心基心加价见容律作面除相争。国着员马容马心管马采较历今并速毛历少。下年革题种育条极空小整知区断。根整极确观她要支高斗斗后增况阶基转。却受白第是到支的切清程适土始切写重。',
      created: '2004-11-25 00:44:41',
      category: 'discuss',
      fav: 681,
      isEnd: '1',
      readNum: 70,
      answerNum: 56,
      status: '0',
      isTop: '0',
      sort: 'answer',
      tags: [
        {
          name: '精华',
          class: 'layui-bg-red'
        }
      ]
    }

    Post.create(insertData)

    // 1.校验客户端传来的数据是否合法
    // const v = await new ContentValidator(ctx).validate()

    // // 2.获取客户端传来的参数
    // const { page, size, sort, ...option } = v
    // // 3.获取帖子列表
    // const data = await Post.getList(option, page, size, sort)
    // // 4.返回数据
    // ctx.body = success(data)
  }
}

export default new ContentController()
