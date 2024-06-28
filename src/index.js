import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import json from "koa-json";
import helmet from "koa-helmet";
import koaStatic from "koa-static";
import path from "path";
import router from "./router";
import compose from "koa-compose";
import koaCompress from "koa-compress";
import session from "koa-session";
import { setEnv } from "./utils/env";
import catchError from "./middleware/exception";
setEnv()
const app = new Koa();

app.use(catchError);

app.keys = [process.env.KOA_SESSION_KEYS];

console.log("NODE_ENV", process.env.NODE_ENV);

const config = {
  key: process.env.KOA_SESSION_KEY,
  maxAge: +process.env.KOA_SESSION_MAX_AGE,
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
