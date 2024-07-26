## 停止容器

docker stop gitlab_test

## 删除容器

docker rm gitlab_test

## 删除镜像

docker rmi gitlab/gitlab-ce:latest

## 创建容器

dokcer run --hostname 101.37.12.36 --name gitlab_test --publish 13800:80 --publish 13822:22 --restart always  -d gitlab/gitlab-ce:latest

## 打开防火墙

firewall-cmd --zone=public --add-port=13800/tcp --permanent
firewall-cmd --zone=public --add-port=13822/tcp --permanent
firewall-cmd --reload
