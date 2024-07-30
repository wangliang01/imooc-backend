## Dockerfile作用

* 用于产生docker镜像
* Dockerfile按照步骤构建，产生文件系统
* Dockerfile是镜像的配置文件，高度可配置


## 记得创建.dockerignore文件
* 默认情况下，Docker会复制当前目录下的所有文件到镜像中，这可能会导致镜像体积过大，所以需要创建.dockerignore文件，指定不需要复制的文件或目录


## 如何给我们的Vue项目编写Dockerfile
我们在[Dockerize Vue.js App](https://v2.cn.vuejs.org/v2/cookbook/dockerize-vuejs-app.html) 可以看到一个基本示例

```dockerfile
# 声明构建阶段的镜像
# build stage
FROM node:16 as build-stage

# 设置维护者信息
LABEL maintainer="1392830517@qq.com"

# 设置工作目录
WORKDIR /app

# 将当前目录内容复制到容器中
COPY . .

# 安装依赖并执行构建命令
RUN npm install
RUN npm run build

# 声明生产阶段的镜像
# production stage
FROM nginx:16 as production-stage

# 将构建阶段生成的文件复制到nginx的静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
```
