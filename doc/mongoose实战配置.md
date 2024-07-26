# mongoose实战配置

## 1、安装mongoose

```bash
npm install mongoose --save
```

## 2、配置mongoose

创建一个db.js文件，配置mongoose

```js
// import { setEnv } from "../utils/env";
// setEnv()  测试时需要设置环境变量
import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

export default mongoose;

```

## 3、创建模型

在models文件夹下创建一个user.js文件，创建一个user模型

```js
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
```

## 4、测试模型

在test文件夹下创建一个test.js文件，测试模型

```js
import User from "../src/model/user";


const user = new User({
  name: 'james',
  age: '123456',
  email: 'james@qq.com'
})

user.save().then(res => {
  console.log("保存成功")
})
```
