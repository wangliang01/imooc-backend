import Router from 'koa-router'
const router = new Router({
  prefix: '/api/public'
})
import globalController from '../api/public'

// Controller

router.get('/captcha', globalController.getCaptcha)

export default router
