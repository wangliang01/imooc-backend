#!/bin/bash

# 注释：这是一个简单的 Shell 脚本示例

# 变量声明
my_var="Hello World"

# 输出变量值
echo "Value of my_var: $my_var"

# 流程控制：if 语句
if [ "$my_var" = "Hello World" ]; then
    echo "Variable matches."
else
    echo "Variable does not match."
fi

# 函数定义
function greet {
    local name="$1"
    echo "Hello, $name!"
}

# 参数传递
greet "Alice"

# 退出脚本
exit 0