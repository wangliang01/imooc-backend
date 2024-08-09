import mongoose from '../utils/db'
import bcrypt from 'bcryptjs'

// 定义模型
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  nickname: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  created: {
    type: String,
    required: true
  },
  updated: {
    type: String,
    required: false
  },
  favs: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  roles: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  regmark: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  vip: {
    type: String,
    required: false
  },
  count: {
    type: Number,
    required: false
  }
})

const User = mongoose.model('user', UserSchema)

/**
 * 检查密码
 * @param {String} password
 * @returns
 */
User.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default User
