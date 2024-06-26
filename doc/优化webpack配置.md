# webpack优化配置

## npm-check-updates 升级依赖包

```bash
npm install -g npm-check-updates
```

> ncu: 检查依赖包版本
> ncu -u: 检查依赖包版本，升级依赖包

## 对webpack配置进行优化

我们将webpack配置抽离到config文件夹下，方便管理。
--webpack.config.base.js
--webpack.config.dev.js
--webpack.config.prod.js

**webpack.config.base.js**

```js
// webpack.config.base.js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const webpackconfig = {
  entry: {
    server: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, 'node_modules')]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') ? JSON.stringify('production') : JSON.stringify('development')
    })
  ],
  externals: [nodeExternals()],
  target: 'node'
}


module.exports = webpackconfig

```

**webpack.config.dev.js**

```js
// webpack.config.dev.js
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');

const webpackConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: { children: false }
})


module.exports = webpackConfig;
```

**webpack.config.prod.js**

```js
// webpack.config.prod.js
const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.base");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const webpackConfig = merge(webpackBaseConfig, {
  mode: "production",
  stats: { children: false, warnings: false },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
            ascii_only: false
          },
          mangle: true
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
});

module.exports = webpackConfig;

```

**配置环境变量**
通过`dotenv`来读取`.env`文件，然后通过`process.env`来获取环境变量。

```js
// src/index.js
import { configDotenv } from "dotenv";
import path from "path";

const setEnv = () => {
  // 首先加载通用的 .env 文件
  configDotenv({ path: path.join(__dirname, "../../.env") });

  if (process.env.NODE_ENV === "production") {
    // 如果是生产环境，再加载 .env.prod 文件
    configDotenv({ path: path.join(__dirname, "../../.env.prod") });
  } else {
    // 否则加载 .env.dev 文件
    configDotenv({ path: path.join(__dirname, "../../.env.dev") });
  }
};


setEnv()
```

**修改api中commonjs写法，改为ES6模块写法**
```js
// module.exports = function (ctx) {
//   ctx.body =  {
//     name: 'user',
//     path: '/user',
//     meta: {
//       title: '用户中心!!!'
//     }
//   }
// }

class UserController {
  constructor() {}
  async index(ctx) {
    ctx.body = {
      name: 'user',
      path: '/user',
      meta: {
        title: '用户中心!!!!!'
      }
    }
  }
}

export default new UserController()
```

**修改routes的写法**
```js
// routes/user.js
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


// routes/index.js
// const combineRouters = require('koa-combine-routers');

// const user = require('./user');

// module.exports = combineRouters(
//   user
// );

import combineRouters from "koa-combine-routers";

import user from "./user";

export default combineRouters(user);

```
