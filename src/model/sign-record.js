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
  favs: {
    type: Number
  }
})

// pre勾子函数
SignRecordSchema.pre('save', function (next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

SignRecordSchema.static('findByUid', async function (uid) {
  const result = await this.findOne({ uid }).sort({ created: -1 })
  return result
})

const SignRecord = mongoose.model('SignRecord', SignRecordSchema)

export default SignRecord
