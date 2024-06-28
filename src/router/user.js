import Router from 'koa-router'
import userController from '../api/user'
import * as yup from 'yup'
import { KoaValidator } from '../validator'
const router = new Router({
  prefix: '/api'
})

router.get('/user', userController.index)

console.log(yup.string().required({ message: '请输入用户名' }).email({ message: '请输入正确的邮箱' }))
router.post('/login', async (ctx) => {
  const rules = {
    username: yup.string().required({ message: '请输入用户名' }).email({ message: '请输入正确的邮箱' }),
    password: yup.string().required({ message: '请输入密码' }).min(6, { message: '密码不能少于6位' }),
    code: yup.string().required({ message: '请输入验证码' }).min(4, { message: '验证码只支持4位' }).max(4, { message: '验证码只支持4位' })
  }

  const params = await new KoaValidator(ctx, rules).validate()
  console.log(params)
})



export default router