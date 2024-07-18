import mongoose from "../utils/db";


// 定义模型
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
})

const User = mongoose.model('Users', UserSchema)

/**
 * 检查密码
 * @param {String} password 
 * @returns 
 */
User.prototype.checkPassword = function (password) {
  return this.password === password
}

export default User