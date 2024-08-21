import Router from 'koa-router'
import UserController from '../api/user'

const router = new Router({
  prefix: '/api'
})

router.get('/user/fav', UserController.userSign)

export default router
