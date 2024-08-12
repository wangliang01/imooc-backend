#!/bin/bash

# 停止 MySQL 服务
sudo systemctl stop mysqld

# 卸载 MySQL 软件包
sudo yum remove mysql-server mysql-client mysql-libs

# 删除 MySQL 配置文件
sudo rm -f /etc/my.cnf /etc/mysql/my.cnf

# 删除 MySQL 数据目录
sudo rm -rf /var/lib/mysql

# 清理残留的 MySQL 文件
rpm -qa | grep -i mysql | xargs sudo rpm -e --nodeps