#!/bin/bash
# 设置环境变量
set -e

# 开始监听信号
# 使用 bash 的内置信号处理机制
trap "exit 0" SIGINT SIGTERM

# 启动应用
exec node dist/server.bundle.js