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
  }
})

const User = mongoose.model('users', UserSchema)

/**
 * 检查密码
 * @param {String} password
 * @returns
 */
User.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default User
