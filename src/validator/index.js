import { KoaValidator } from '../utils/koaValidator'
import * as yup from 'yup'

// 登录校验器
export class LoginValidator extends KoaValidator {
  constructor(ctx) {
    const rules = {
      username: yup.string().required({ message: '请输入用户名' }).email({ message: '请输入正确的邮箱' }),
      nickname: yup.string().optional(),
      password: yup.string().required({ message: '请输入密码' }).min(6, { message: '密码不能少于6位' }),
      code: yup.string().required({ message: '请输入验证码' }).min(4, { message: '验证码只支持4位' }).max(4, { message: '验证码只支持4位' }),
      sid: yup.string().required({ message: '请输入sid' })
    }
    super(ctx, rules)
  }
}

// 获取文章列表校验器
export class ContentValidator extends KoaValidator {
  constructor(ctx) {
    const rules = {
      type: yup.string().required({ message: '请传入type' }),
      page: yup.number().optional(),
      size: yup.number().optional(),
      category: yup.string().optional(),
      sort: yup.string().optional(),
      status: yup.string().optional()
    }
    super(ctx, rules)
  }
}
