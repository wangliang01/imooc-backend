#!/bin/bash
container_name="imooc-backend"
port=12005
no_cache=true
# 定义变量
CONTAINER_NAME=${container_name}
PORT=${port}
NO_CACHE=${no_cache}

# 输出变量值
echo "Container Name: $CONTAINER_NAME"
echo "Port: $PORT"

# 检查容器是否存在
if docker ps -a | grep -q $CONTAINER_NAME; then
    echo "Found existing container, stopping and removing it..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# 配置 Docker 镜像源
echo "Setting up Docker registry mirrors..."

# cat <<EOF >/etc/docker/daemon.json
# {
#     "registry-mirrors": [
#         "https://docker.1panel.live/",
#         "https://dockerhub.icu",
#         "https://docker.hpcloud.cloud",
#         "https://hub.rat.dev"
#     ]
# }
# EOF

# 通过 Dockerfile 构建镜像
echo "Building the Docker image..."
docker build --no-cache=$NO_CACHE -t $CONTAINER_NAME:latest .

# 检查构建是否成功
build_status=$?
if [[ $build_status -ne 0 ]]; then
    echo "Error: Docker build failed."
    exit 1
fi

# 运行镜像
echo "Starting the container..."
docker run -itd -p $PORT:12005 --name $CONTAINER_NAME $CONTAINER_NAME:latest

# 检查容器是否成功启动
is_container_running=$(docker inspect -f "{{.State.Running}}" $CONTAINER_NAME 2>/dev/null)

if [[ $is_container_running != "true" ]]; then
    echo "Error: Container did not start successfully."
    docker logs $CONTAINER_NAME
    exit 1
fi

# 输出成功信息
echo "Container started successfully."
