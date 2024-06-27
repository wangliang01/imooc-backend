# 使用Vuelidate来检验表单

平时使用`element-ui`等UI框架，都内置了表单校验，当我们自己自己写表单时，我们通常需要自己写校验，这时我们可以使用`Vuelidate`来校验表单。

首先，我们安装`Vuelidate`：

```bash
npm install @vuelidate/core @vuelidate/validators
```

我们先来定义一个表单：

```vue
<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/utils/request'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers} from '@vuelidate/validators'

const captcha = ref('')

const state = reactive({
  username: '',
  password: '',
  code: ''
})

const rules = {
  username: {
    required: helpers.withMessage('请输入用户名', required), // 通过helpers.withMessage自定义message
    email: helpers.withMessage('请输入正确的邮箱', email)
  },
  password: {
    required: helpers.withMessage('请输入密码', required),
    minLength: helpers.withMessage('密码最少为6位', minLength(6))
  },
  code: {
    required: helpers.withMessage('请输入验证码', required),
    minLength: helpers.withMessage('验证码只支持4位', minLength(4)),
    maxLength: helpers.withMessage('验证码只支持4位', maxLength(4))
  }
}

const $v = useVuelidate(rules, state)

// 校验
// const validate = () => {
//   return new Promise((resolve, reject) => {
//     const errMsg = []
//     if (!username.value) {
//       errMsg.push('请输入用户名')
//     }
//     if (!password.value) {
//       errMsg.push('请输入密码')
//     }
//     if (!code.value) {
//       errMsg.push('请输入验证码')
//     }

//     const valid = errMsg.length === 0

//     resolve(valid)
//   })
// }

// 登录
const handleLogin = async (e) => {
  e.preventDefault()
  // const valid = await validate()
  $v.value.$validate()
  console.log($v.value)
  if ($v.value.$invalid) {
    return
  }
  console.log('submit')
}


const getCaptcha = async () => {
  const res = await request.get('/captcha')
  captcha.value = res
}

onMounted(() => {
  getCaptcha()
})

</script>

<template>
  <div class="bg-[#f2f2f2] min-h-screen flex items-center">
    <div class="flex gap-2 layui-container rounded-xl overflow-hidden items-center bg-white">
      <div class="w-[700px] h-[600px]">
        <img src="https://picsum.photos/700/600" alt="">
      </div>
      <div class="flex-1">
        <h1 class="text-center font-bold text-2xl">IMOOC管理系统</h1>
        <form class="layui-form flex-1">
          <div class="demo-login-container">
            <div class="layui-form-item">
              <div class="layui-input-wrap">
                <div class="layui-input-prefix">
                  <i class="layui-icon layui-icon-username"></i>
                </div>
                <input type="text" name="username" v-model.trim="state.username" lay-verify="required" placeholder="用户名"
                  lay-reqtext="请填写用户名" autocomplete="off" class="layui-input" lay-affix="clear">
                <p v-if="$v.username.$error" class="text-xs text-red-600">{{ $v.username.$errors[0].$message }}</p>
              </div>
            </div>
            <div class="layui-form-item">
              <div class="layui-input-wrap">
                <div class="layui-input-prefix">
                  <i class="layui-icon layui-icon-password"></i>
                </div>
                <input type="password" name="password" v-model="state.password" lay-verify="required"
                  placeholder="密   码" lay-reqtext="请填写密码" autocomplete="off" class="layui-input" lay-affix="eye">
                <p v-if="$v.password.$error" class="text-xs text-red-600">{{ $v.password.$errors[0].$message }}</p>
              </div>
            </div>
            <div class="layui-form-item">
              <div class="layui-row">
                <div class="layui-col-xs7">
                  <div class="layui-input-wrap">
                    <div class="layui-input-prefix">
                      <i class="layui-icon layui-icon-vercode"></i>
                    </div>
                    <input type="text" name="captcha" v-model="state.code" lay-verify="required" placeholder="验证码"
                      lay-reqtext="请填写验证码" autocomplete="off" class="layui-input" lay-affix="clear">
                    <p v-if="$v.code.$error" class="text-xs text-red-600">{{ $v.code.$errors[0].$message }}</p>
                  </div>
                </div>
                <div class="layui-col-xs5">
                  <div style="margin-left: 10px;">
                    <div v-html="captcha" @click="getCaptcha" class="cursor-pointer"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="layui-form-item">
              <input type="checkbox" name="remember" lay-skin="primary" title="记住密码">
              <a href="#forget" style="float: right; margin-top: 7px;">忘记密码？</a>
            </div>
            <div class="layui-form-item">
              <button class="layui-btn layui-btn-fluid" lay-submit lay-filter="demo-login"
                @click="handleLogin">登录</button>
            </div>
            <div class="layui-form-item demo-login-other">
              <label>社交账号登录</label>
              <span style="padding: 0 21px 0 6px;">
                <a href="javascript:;"><i class="layui-icon layui-icon-login-qq" style="color: #3492ed;"></i></a>
                <a href="javascript:;"><i class="layui-icon layui-icon-login-wechat" style="color: #4daf29;"></i></a>
                <a href="javascript:;"><i class="layui-icon layui-icon-login-weibo" style="color: #cf1900;"></i></a>
              </span>
              或 <a href="#reg">注册帐号</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-login-container {
  width: 320px;
  margin: 21px auto 0;
}

.demo-login-other .layui-icon {
  position: relative;
  display: inline-block;
  margin: 0 2px;
  top: 2px;
  font-size: 26px;
}
</style>

```
