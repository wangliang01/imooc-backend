# circleci在项目中的使用

这里以一个Vue项目为例，介绍circleci在项目中的使用。

## 1、 先在项目根目录下创建.circleci文件夹，并在其中创建config.yml文件

```bash
# CircleCI配置文件，版本2.0
version: 2

# 定义一个名为build的工作流
jobs:
  build:
    # 在Docker容器中运行构建，使用CircleCI预构建的Node.js 16镜像
    docker:
      - image: circleci/node:16
    steps:
      # 检出代码
      - checkout
      # 恢复缓存，以加速构建过程
      - restore_cache:
          keys:
            # 根据package.json的校验和恢复依赖缓存
            - v1-dependencies-{{ checksum "package.json" }}
            # 如果校验和无法匹配，尝试恢复最新的依赖缓存
            - v1-dependencies-
      # 安装项目依赖
      - run:
          name: Install
          command: npm install
      # 保存依赖缓存
      - save_cache:
          paths:
            # 保存node_modules目录
            - node_modules
          key: v1-dependencies-{{ checksum "package.json" }}
      # 执行构建命令
      - run:
          name: Build
          command: npm run build
      # 给部署脚本添加执行权限
      - run: 
          name: Prepare shell commands
          # shell chmod +x 赋于执行权限
          # 执行shell脚本
          command: chmod +x ./scripts/deploy.sh
      # 执行部署脚本，将构建结果部署到Github Pages
      - run:
          name: Deploy to Github Pages
          command: ./scripts/deploy.sh
```

因为在部署时，配置了一段脚本，所以需要先在项目根目录下创建scripts文件夹，并在其中创建deploy.sh文件。

```bash
# 编写deploy to github pages脚本
#!/bin/sh

# 确保脚本抛出遇到的错误
set -e

# 打印当前工作路径
pwd
remote=$(git config --get remote.origin.url)

echo 'remote is: '$remote

# 新建一个发布的目录
mkdir gh-pages-branch
cd gh-pages-branch

# 创建一个新的仓库
# 设置发布的用户名与邮箱
git config --global user.name "$USER_NAME" >/dev/null 2>&1
git config --global user.email "$USER_EMAIL" >/dev/null 2>&1
git init

# 关联运程仓库
git remote add --fetch origin "$remote"

# 打印用户名与邮箱
echo 'user is: '$USER_NAME
echo 'email is: '$USER_EMAIL

# 打印打包后的目录
echo 'build dist is: '$outputDir

# 切换gh-pages分支
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
  git checkout gh-pages
  # 删除旧的文件内容
  git rm -rf .
else
  git checkout --orphan gh-pages
fi

# 把构建好的文件复制到gh-pages分支
cp -a "../${outputDir}/." .

ls -la

# 把所有文件添加到git
git add -A

# 添加一条提交记录
git commit --allow-empty -m "deploy to github pages [ci skip]"

# 推送到远程仓库
git push --force --quiet origin gh-pages

# 资源回收，删除临时分支与目录
cd ..
rm -rf gh-pages-branch

echo 'deploy to github pages success'

```
