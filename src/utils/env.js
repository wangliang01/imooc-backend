// app.js
require('dotenv').config()
const fs = require('fs')

// 加载通用的 .env 文件
const genericEnvFilePath = '.env'
if (fs.existsSync(genericEnvFilePath)) {
  require('dotenv').config({ path: genericEnvFilePath })
}

// 根据 NODE_ENV 的值加载对应的 .env 文件
let envFile

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

switch (process.env.NODE_ENV) {
  case 'production':
    envFile = '.env.prod'
    break
  default: // development
    envFile = '.env.dev'
}

// 加载特定环境的 .env 文件
if (envFile && fs.existsSync(envFile)) {
  require('dotenv').config({ path: envFile })
}

// 现在 process.env 中包含了正确的环境变量
console.log(process.env.PORT) // 输出 MY_VARIABLE 的值
