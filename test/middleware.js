const Koa = require('koa');
const app = new Koa();
// 解释洋葱模型
const middleware1 = async (ctx, next) => {
  console.log('middleware1 start');
  await next();
  console.log('middleware1 end');
};

const middleware2 = async (ctx, next) => {
  console.log('middleware2 start');
  await next();
  console.log('middleware2 end');
};

app.use(middleware1);
app.use(middleware2);

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});