import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import json from "koa-json";
import helmet from "koa-helmet";
import koaStatic from "koa-static";
import path from "path";
import router from "./routes";

const app = new Koa();
app.use(koaStatic(path.join(__dirname, "../public")));
app.use(helmet());
app.use(koaBody({}));
app.use(cors());
app.use(json({ pretty: false, param: "pretty" }));
app.use(router());

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
