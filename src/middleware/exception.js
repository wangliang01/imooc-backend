import { HttpException } from "../utils/httpException";
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 如果是生产环境，优化错误信息
    if (process.env.NODE_ENV === "production") {
      ctx.status = 500;
      ctx.body = {
        msg: "服务器异常，请稍后重试",
        code: 999,
        data: null
      }
    } else {
      
      if (error instanceof HttpException) {
        // 如果是自定义的错误，则返回自定义的错误信息
        ctx.body = {
          msg: error.msg,
          code: error.errorCode,
          data: null
        }
        ctx.status = error.code
      } else {
        // 如果是未知的错误，则返回未知的错误信息
        throw error;
      }
    }
  }
};

export default catchError;
