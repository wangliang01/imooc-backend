import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import json from "koa-json";
import helmet from "koa-helmet";
import koaStatic from "koa-static";
import path from "path";
import router from "./routes";
import compose from "koa-compose";
import koaCompress from "koa-compress";
import session from "koa-session";
import { setEnv } from "./utils/env";
setEnv()
const app = new Koa();

app.keys = ['abcabc'];

console.log("TEST_URL", process.env.TEST_URL);
console.log("process.env", process.env.ABC);

const config = {
  key: "koa:sess",
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
};

const middleware = compose([
  koaBody({ multipart: true }),
  cors(),
  json(),
  session(config, app),
  helmet(),
  koaStatic(path.join(__dirname, "../public")),
  router(),
]);
// app.use(koaStatic(path.join(__dirname, "../public")));
// app.use(helmet());
// app.use(koaBody({}));
// app.use(cors());
// app.use(json({ pretty: false, param: "pretty" }));
// app.use(router());

app.use(middleware);

if (process.env.NODE_ENV === "production") {
  app.use(koaCompress());
}

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
