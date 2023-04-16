<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <!-- 会传递给插槽(slot)带有name=label的地方 -->
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref, onUpdated } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

// 一、定义属性
const isKeepPassword = ref(true)
const currentTab = ref('account')
//绑定ref，获取组件
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

// 二、定义方法
const handleLoginClick = () => {
  console.log(accountRef.value)

  if (currentTab.value === 'account') {
    console.log('登陆')
    // 通过ref拿到子组件
    accountRef.value?.accountLoginAction(isKeepPassword.value) //调用子组件的方法
  } else {
    phoneRef.value?.phoneLoginAction({ code: 2021 })
  }
}
onUpdated(() => {
  console.log(isKeepPassword.value)
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
