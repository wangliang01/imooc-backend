import Router from 'koa-router'
import ContentController from '../api/content'
const router = new Router({
  prefix: '/api'
})

// 获取文章列表
router.get('/public/list', ContentController.getPostList)

// 获取友情链接
router.get('/public/links', ContentController.getLinks)

// 获取温馨提示
router.get('/public/tips', ContentController.getTips)

// 获取本周热议
router.get('/public/topWeek', ContentController.getTopWeek)

export default router
