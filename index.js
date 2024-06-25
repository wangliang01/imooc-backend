const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'hello world'
})

router.get('/api', async (ctx, next) => {
  ctx.body = 'hello api'
})

app.use(router.routes()).use(router.allowedMethods())



app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})