import mongoose from '../utils/db'
import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'
import { HttpException } from '../utils/httpException'

// 定义模型
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  nickname: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: String
  },
  updated: {
    type: String
  },
  favs: {
    type: Number,
    default: 100
  },
  gender: {
    type: String,
    default: '0'
  },
  roles: {
    type: Array,
    default: ['user']
  },
  avatar: {
    type: String,
    default: 'https://picsum.photos/100/100'
  },
  phone: {
    type: String,
    match: /^1[3456789]\d{9}$/,
    default: ''
  },
  status: {
    type: String,
    default: '0'
  },
  regmark: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  vip: {
    type: String,
    default: '0'
  },
  count: {
    type: Number,
    default: 0
  }
})

// UserSchema.pre('save', function (next) {
//   this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
//   this.email = this.username
//   next()
// })

UserSchema.pre('update', function (next) {
  this.updated = dayjs().format('YYYY-MM-DD HH:mm:ss')
  next()
})

UserSchema.post('save', function (error, doc, next) {
  this.created = dayjs().format('YYYY-MM-DD HH:mm:ss')
  this.email = this.username
  if (error.name === 'MongoError' && error.code === 11000) {
    throw HttpException('该用户已存在', 10000, 400)
  }
  next()
})

UserSchema.static('findById', async function (id) {
  return await this.findOne(
    { _id: id },
    {
      password: 0,
      username: 0
    }
  )
})

const User = mongoose.model('User', UserSchema)

/**
 * 检查密码
 * @param {String} password
 * @returns
 */
User.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default User
