# Koa开发热加载，ES6语法支持

平时我们使用Koa开发，都是使用commonjs规范，但有些ES6的新语法就不能使用，有什么办法可以使用ES6语法呢？
能直接在node项目中使用ES6语法吗？

1. 使用`babel-node`， `babel-node`是`babel`提供的一个命令行工具，可以支持ES6语法，但是不能热加载，所以不能满足我们的需求。但配合`nodemon`，可以做到热加载。

2. 使用`esno` ，`esno`是esbuild提供的一个命令行工具，可以支持ES6语法，并且支持热加载，所以可以满足我们的需求。

> 但这些都只能用在开发环境，不能用于生产环境。生产环境需要使用`babel`或者`swc`等工具进行编译，这里我们使用了webpack + babel 将ES6语法编译成ES5语法，再使用`koa`将编译后的文件托管到服务器上。

**首先，我们需要安装一些依赖：**

```bash
## 安装webpack 
npm install webpack webpack-cli --save-dev

## 安装babel相关依赖
npm install babel-loader @babel/core @babel/preset-env --save-dev

## 安装开发热加载相关依赖(这里其实只用esno即可)
npm install @babel/node nodemon esno --save-dev

## 安装清除目录，node-external 插件
npm install clean-webpack-plugin webpack-node-externals --save-dev

## 设置环境变量cross-env
npm install cross-env --save-dev

```

**配置webpack.config.js**

```js
// webpack.config.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清理dist目录下的文件
const nodeExternals = require('webpack-node-externals') // 对node-modules目录下进行排除处理（排除不会使用到的模块）

const webpackconfig = {
  mode: 'development',
  entry: {
    server: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'eval-cheap-source-map',
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
    new CleanWebpackPlugin()
  ],
  externals: [nodeExternals()],
  target: 'node'
}

module.exports = webpackconfig

```

**配置babel.config.js**

```js
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
  ],
}
```

**使用ES6语法改写入口文件**

```js
// src/index.js
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

```

**配置npm scripts**

```json
// package.json
 "scripts": {
    "start": "nodemon --exec esno src/index.js",
    "dev": "nodemon --exec babel-node src/index.js"
  }
```

这就完成了Koa开发热加载、ES6语法支持的配置。即可以在开发时使用ES6语法，并且支持热加载。
