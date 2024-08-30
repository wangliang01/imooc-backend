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
router.post('/forget', LoginController.forget)

export default router
