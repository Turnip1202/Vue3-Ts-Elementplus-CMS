<template>
  <div class="login-account">
    <el-form lable-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

const store = useStore()
const formRef = ref<InstanceType<typeof ElForm>>() //拿到form组件的ref
const accountLoginAction = (isKeepPassword: boolean) => {
  console.log('子组件内部')
  // 验证是否通过
  formRef.value?.validate((valid) => {
    console.log('验证函数内部')
    if (valid)
      if (isKeepPassword) {
        // 判断是否要记住密码
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        // 清空本地缓存
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
    // 2.开始进行登陆验证
    // vuex进行分发事件（login模块）
    store.dispatch('login/accountLoginAction', { ...account })
  })
}
defineExpose({ accountLoginAction })
</script>

<style scoped lang="less"></style>
