import Router from 'koa-router'
const router = new Router({
  prefix: '/api'
})
import captcha from '../api/captcha'

router.get('/captcha', captcha.getCaptcha)

export default router