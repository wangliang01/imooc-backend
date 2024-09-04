import Router from 'koa-router'
import userCtronoller from '../api/user'
const router = new Router({
  prefix: '/api/public'
})
import globalController from '../api/public'

router.get('/captcha', globalController.getCaptcha)

router.get('/reset-email', userCtronoller.updateUsername)

export default router
