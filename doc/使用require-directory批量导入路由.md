# 使用require-directory批量导入路由

1. 安装依赖包

```bash
npm install require-directory --save
```

在router/index.js中引入

```js
import combineRouters from "koa-combine-routers";
import Router from "koa-router";
import requireDirectory from "require-directory";
import path from "path";

const routers = []

requireDirectory(module, path.join(__dirname, '../router'), {
  visit: (obj) => {
    const router = obj.default
    if (router instanceof Router) {
      routers.push(router);
    }
  }
})


export default combineRouters(...routers)

```
