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
  fav: {
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

// 添加方法
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
  console.log('🚀 ~ result:', result)

  return result
})

const Post = mongoose.model('Post', PostSchema)
export default Post
