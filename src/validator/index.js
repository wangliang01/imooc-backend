import { KoaValidator } from "../utils/koaValidator";
import * as yup from 'yup'

// 登录校验器
export class LoginValidator extends KoaValidator {
  constructor(ctx) {
    const rules = {
      username: yup.string().required({ message: '请输入用户名' }).email({ message: '请输入正确的邮箱' }),
      password: yup.string().required({ message: '请输入密码' }).min(6, { message: '密码不能少于6位' }),
      code: yup.string().required({ message: '请输入验证码' }).min(4, { message: '验证码只支持4位' }).max(4, { message: '验证码只支持4位' })
    }
    super(ctx, rules)
  }
}