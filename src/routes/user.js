const Router = require('koa-router')
const router = new Router({
  prefix: '/api'
})

const user = require('../api/user')

router.get('/user', user)


module.exports = router