import Router from 'koa-router'
import LoginController from '../api/login'

const router = new Router({
  prefix: '/api'
})

// 注册
router.post('/register', LoginController.register)

// 登录
router.post('/login', LoginController.login)

// 忘记密码
router.post('/forget', async (ctx) => {
  // const params = await new LoginValidator(ctx).validate()
  // console.log(params)
  // ctx.body = params
})

export default router
