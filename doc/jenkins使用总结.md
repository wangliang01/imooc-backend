# jenkis使用总结

这里使用docker-compose来启动jenkis

1. 创建docker-compose.yml文件

```yaml
version: '3'
services:
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins:lts
    restart: always
    user: jenkins:994
    ports: 
      - "10050:8080"
      - "50000:50000"
      - "10051:10051"
    volumes:
      # linux上的配置,二才只取其一
      - /home/jenkins/data:/var/jenkins_home
      - /usr/bin/docker:/usr/bin/docker
      - /var/run/docker.sock:/var/run/docker.sock
      # window上的配置
      # - d:/dockerData/jenkis/config:/var/jenkins_home
      # - d:/dockerData/docker:/usr/bin/docker
      # - d:/dockerData/docker.sock:/var/run/docker.sock
```

## 将上面的转成命令行

docker run --name jenkins -d -p 10050:8080 -p 50000:50000 -p 10051:10051  jenkins/jenkins:lts

运行容器后，使用
docker logs jenkis -f 查看日志，找到初始密码： f248ce5c69824c0ca51d7f83d4fa6d9c

防火墙放行：
firewall-cmd --zone=public --add-port=10050/tcp --permanent
firewall-cmd --reload

访问页面：<http://101.37.12.36:10050> ,不出意外，会跳转到登录页面，输入上面得到的密码即可

配置升级站点

1. 登录页面，点击Manage Jenkis -> 插件管理，找到Advanced settings，找到升级站点，修改为 `https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`

jenkins的常用插件


如何备份自己的镜像

1. 备份镜像
docker ps | grep jenkins    # 找到容器ID
docker commit  a65a69481e89 jenkins:1.0
运行
docker run -itd -v /tmp:/tmp  jenkins:1.0

docker exec -it thirsty_nightingale cp -r /var/jenkins_home /tmp

2. 另一种备份方法
 docker run  --rm --volumes-from jenkins -v  /tmp/backup:/backup ubuntu tar cvf /backup/backup.tar /var/jenkins_home

 解压
 tar xvf backup.tar

3. 第三种备份方法
 先查看jenkis容器id
 docker ps | grep jenkins  # a65a69481e89

 docker cp a65a69481e89:/var/jenkins_home /tmp/
