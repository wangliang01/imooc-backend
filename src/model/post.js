import mongoose from '../utils/db'
import dayjs from 'dayjs'
const Schema = mongoose.Schema

// 定义模型
const PostSchema = new mongoose.Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
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
    required: false
  },
  favs: {
    type: Number,
    default: 0
  },
  isEnd: {
    type: String,
    required: false
  },
  readNum: {
    type: Number,
    default: 0
  },
  answerNum: {
    type: Number,
    default: 0
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{ name: String, class: String }]
})

// 添加pre勾子方法
PostSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

// 获取文章列表
PostSchema.static('getList', async function (option, page, size, sort) {
  console.log('getList', option, page, size, sort)
  const result = await this.find(option)
    .sort({ [sort]: -1 })
    .skip((page - 1) * size)
    .limit(size)
    // .populate('user', ['nickname', 'username'])
    .populate({
      path: 'user',
      select: ['nickname', 'avatar', 'vip']
    })

  return result
})

// 获取本周热议
PostSchema.static('getTopWeek', async function () {
  // 最近七天
  const result = await this.find({
    answerNum: { $gte: 20 }
  })
    .sort({ created: -1 })
    .limit(15)
  return result
})

const Post = mongoose.model('Post', PostSchema)
export default Post
