import mongoose from "../utils/db";


// 定义模型
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
})

const User = mongoose.model('User', UserSchema)

export default User