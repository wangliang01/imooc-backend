import Router from 'koa-router'
const router = new Router({
  prefix: '/api/public'
})
import globalContronller from '../api/public'

router.get('/captcha', globalContronller.getCaptchaV2)

export default router