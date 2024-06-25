const Koa = require("koa");
const Router = require("koa-router");
const { koaBody } = require("koa-body");
const cors = require("@koa/cors");
const json = require("koa-json");

const app = new Koa();

const router = new Router({
  prefix: "/api",
});

router.get("/user", async (ctx) => {
  const query = ctx.query;
  ctx.body = {
    ...query,
  };
});

router.post("/user", async (ctx) => {
  let { body } = ctx.request;
  console.log(body);
  ctx.body = {
    ...body,
  };
});

router.put("/user/:id", async (ctx) => {
  let { body } = ctx.request;
  const params = ctx.params;
  ctx.body = {
    ...params,
    ...body,
  };
});

router.delete("/user/:id", async (ctx) => {
  let { body } = ctx.request;
  const params = ctx.params;
  console.log(body);
  ctx.body = {
    ...params,
  };
});

app.use(koaBody({}));
app.use(cors());
app.use(json({ pretty: false, param: "pretty" }));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
