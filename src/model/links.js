import mongoose from '../utils/db'
import dayjs from 'dayjs'

// 定义模型

const LinkSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: {
    type: String,
    default: '1' // 1:友情链接 2:温馨提示
  },
  created: {
    type: String
  },
  isTop: {
    type: String,
    default: '0'
  },
  sort: {
    type: Number
  },
  pic: String
})

// pre勾子函数
LinkSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

const Link = mongoose.model('Link', LinkSchema)

export default Link
