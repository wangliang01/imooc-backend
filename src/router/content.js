import Router from 'koa-router'
import ContentController from '../api/content'

const router = new Router({
  prefix: '/api'
})

// 获取文章列表
router.get('/public/list', ContentController.getPostList)

export default router
