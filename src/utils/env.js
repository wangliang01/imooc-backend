import { configDotenv } from "dotenv";
import path from "path";

export const setEnv = () => {
  // 首先加载通用的 .env 文件
  configDotenv({ path: path.join(__dirname, "../../.env") });

  if (process.env.NODE_ENV === "production") {
    // 如果是生产环境，再加载 .env.prod 文件
    configDotenv({ path: path.join(__dirname, "../../.env.prod") });
  } else {
    // 否则加载 .env.dev 文件
    configDotenv({ path: path.join(__dirname, "../../.env.dev") });
  }
};

