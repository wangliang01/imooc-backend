import User from "../src/model/user";


const user = new User({
  name: 'james',
  age: '123456',
  email: 'james@qq.com'
})

user.save().then(res => {
  console.log("保存成功")
})