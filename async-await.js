const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const router = new Router()

router.get('/async', async (ctx, next) => {
  
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world')
    }, 1000)
  })
  ctx.body = result
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})