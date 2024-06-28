// const Router = require('koa-router')
import Router from 'koa-router'
import userController from '../api/user'
const router = new Router({
  prefix: '/api'
})

const user = require('../api/user')

router.get('/user', userController.index)


// module.exports = router

export default router