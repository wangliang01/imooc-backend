# 使用vee-validate来校验表单

在Vue项目中，我们通常会使用VeeValidate来校验表单。VeeValidate是一个轻量级的表单验证库，它提供了一套简单的API来验证表单。

首先，我们需要安装VeeValidate：

```bash
npm install vee-validate yup --save
```

在Vue项目中，我们可以使用VeeValidate来验证表单。以下是一个简单的示例：

```vue
<script setup>
import { onMounted, ref, reactive } from 'vue'
import request from '@/utils/request'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
const captcha = ref('')

const { defineField, errors, handleSubmit, validate } = useForm({
  validationSchema: {
    username: yup.string().required({ message: '请输入用户名' }).email({ message: '请输入正确的邮箱' }),
    password: yup.string().required({ message: '请输入密码' }).min(6, { message: '密码不能少于6位' }),
    code: yup.string().required({ message: '请输入验证码' }).min(4, { message: '验证码只支持4位' }).max(4, { message: '验证码只支持4位' })
  },
})

const [username, usernameAttrs] = defineField('username', { validateOnModelUpdate: true })
const [password, passwordAttrs] = defineField('password')
const [code, codeAttrs] = defineField('code')



// 登录
const handleLogin = async (e) => {
  e.preventDefault()
  const {valid} = await validate()
 if (!valid) return false
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
                <input type="text" name="username" v-model.trim="username" v-bind="usernameAttrs" lay-verify="required"
                  placeholder="用户名" lay-reqtext="请填写用户名" autocomplete="off" class="layui-input" lay-affix="clear">
                <p class="text-xs text-red-600" v-if="errors.username">{{ errors.username.message }}</p>

              </div>
            </div>
            <div class="layui-form-item">
              <div class="layui-input-wrap">
                <div class="layui-input-prefix">
                  <i class="layui-icon layui-icon-password"></i>
                </div>
                <input type="password" name="password" v-model="password" v-bind="passwordAttrs" lay-verify="required"
                  placeholder="密   码" lay-reqtext="请填写密码" autocomplete="off" class="layui-input" lay-affix="eye">
                <p class="text-xs text-red-600" v-if="errors.password">{{ errors.password.message }}</p>
              </div>
            </div>
            <div class="layui-form-item">
              <div class="layui-row">
                <div class="layui-col-xs7">
                  <div class="layui-input-wrap">
                    <div class="layui-input-prefix">
                      <i class="layui-icon layui-icon-vercode"></i>
                    </div>
                    <input type="text" name="captcha" v-model="code" v-bind="codeAttrs" lay-verify="required"
                      placeholder="验证码" lay-reqtext="请填写验证码" autocomplete="off" class="layui-input" lay-affix="clear">
                    <p class="text-xs text-red-600" v-if="errors.code">{{ errors.code.message }}</p>
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
