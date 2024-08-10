import Router from 'koa-router'
import ContentController from '../api/content'
const router = new Router({
  prefix: '/api'
})

router.get('/public/list', ContentController.getPostList)

export default router
