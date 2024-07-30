# 声明构建阶段的镜像
# build stage
FROM node:18

# 设置维护者信息
LABEL maintainer="wl1392830717@gmail.com"

# 设置工作目录
WORKDIR /app

# 将当前目录内容复制到容器中
COPY . .

# 安装依赖并执行构建命令
RUN npm install
RUN npm run build

# 暴露端口
EXPOSE 12005

# 
VOLUME ["/app/public"]

CMD ["node" "dist/server.bundle.js"]