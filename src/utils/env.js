import dotenv from 'dotenv'
import path from "path";

// 加载基础配置
dotenv.config({ path: path.join(__dirname, "../../.env") })


// 根据环境变量决定加载哪个配置文件

if (process.env.NODE_ENV === "production") {
  try {
    dotenv.config({ path: path.join(__dirname, "../../.env.prod") })
  } catch (error) {
    console.log("没有找到 .env.prod 文件")
  }
} else {
  try {
    dotenv.config({ path: path.join(__dirname, "../../.env.dev") })
  } catch (error) {
    console.log("没有找到 .env.dev 文件")
  }
}

