import { LoginValidator } from "../validator/index";
import { getValue } from "../utils/redis";
import { HttpException } from "../utils/httpException";
import jwt from "jsonwebtoken";
import { success } from "../utils/helper";
import User from "../model/user";
class LoginController {
  constructor() {}
  async login(ctx) {
    const params = await new LoginValidator(ctx).validate();
    console.log("params", params);
    // 1. 验证码校验
    const code = await getValue(params.sid);
    console.log(code);
    if (code.toLowerCase() !== params.code.toLowerCase()) {
      throw new HttpException("验证码错误");
    }
    // 2. 账号密码校验
    const user = await  User.findOne({
      username: params.username,
    });

    if (!user) {
      throw new HttpException("账号或者密码错误");
    }

    if (!user.checkPassword(params.password)) {
      throw new HttpException("账号或者密码错误");
    }

    // 3. 返回token
    const token = jwt.sign(
      {
        uid: 1,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    success(ctx, {
      token,
    });
  }
  async index(ctx) {
    // throw new HttpException('参数错误', 10000, 400)
    ctx.body = {
      name: "user",
      path: "/user",
      meta: {
        title: "用户中心!!!!!",
      },
    };
  }
}

export default new LoginController();
