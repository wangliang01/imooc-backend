import Router from 'koa-router'
import userController from '../api/user'
import { LoginValidator } from '../validator/index'
const router = new Router({
  prefix: '/api'
})

// router.get('/user', userController.index)

// 注册
router.post('/register', async (ctx) => {
  // const params = await new LoginValidator(ctx).validate()
  // console.log(params)
  // ctx.body = params
})


// 登录
router.post('/login', async (ctx) => {
  const params = await new LoginValidator(ctx).validate()
  console.log(params)
  ctx.body = params
})

// 忘记密码
router.post('/forget', async (ctx) => {
  // const params = await new LoginValidator(ctx).validate()
  // console.log(params)
  // ctx.body = params
})



export default router