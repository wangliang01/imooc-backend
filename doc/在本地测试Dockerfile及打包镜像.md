# 在本地测试Dockerfile及打包镜像

1. 通过Dockerfile构建镜像

```bash
docker build --pull --rm -f "Dockerfile" -t imoocfrontend:latest "."
```

2. 运行镜像

```bash
 docker run -itd  -p 8080:80 --name imoocfrontend imoocfrontend:latest
```
