import mongoose from '../utils/db'

// 定义模型
const PostSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  fav: {
    type: String,
    required: true
  },
  isEnd: {
    type: String,
    required: true
  },
  readNum: {
    type: Number,
    required: false
  },
  answerNum: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  isTop: {
    type: String,
    required: false
  },
  sort: {
    type: String,
    required: false
  },
  tags: {
    type: Array,
    required: false
  }
})

PostSchema.statics = {
  /**
   * 获取帖子列表
   *
   * 本函数用于根据指定的查询选项、分页参数和排序依据，从数据库中获取帖子列表
   * 它使用了人口填充（populate）方法来替换uid字段为对应的用户信息
   *
   * @param {object} option - 查询选项，用于过滤帖子
   * @param {number} page - 页码，用于分页查询
   * @param {number} size - 每页显示数量，用于分页查询
   * @param {string} sort - 排序字段，用于指定排序依据
   * @returns {Promise<Array>} 返回一个Promise，解析为包含查询到的帖子的数组
   */
  async getList(option, page, size, sort) {
    return await Post.find(option)
      .skip((page - 1) * size)
      .limit(size)
      .sort({ [sort]: -1 })
      .populate('uid')

    // 这里我如何通过uid 联合查询用户信息，并将其放到user属性中呢
  }
}

const Post = mongoose.model('post', PostSchema)

export default Post
