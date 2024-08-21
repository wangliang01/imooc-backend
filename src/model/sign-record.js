import mongoose from '../utils/db'
import dayjs from 'dayjs'

// 定义模型
const SignRecordSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    type: String
  },
  fav: {
    type: Number
  },
  lastSign: {
    type: String
  }
})

// pre勾子函数
SignRecordSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  this.lastSign = this.created
  next()
})

SignRecordSchema.pre('update', function (next) {
  this.lastSign = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

SignRecordSchema.static('findByUid', async function (uid) {})

const SignRecord = mongoose.model('SignRecord', SignRecordSchema)

export default SignRecord
